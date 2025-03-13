// Import express.js
const path = require("path");
const express = require("express");

// Create express app
const app = express();

// Add static files location
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

// Get the functions in the db.js file to use
const db = require('./services/db');
const { createPool } = require("mysql2");

// Create a route for root - /
app.get("/", function(req, res) {
    res.send("Hello Dexter!");
});

// app.get("/db_test/:id", function(req,res){
//     console.log(req.params);
//     let sql = ("SELECT * from test_table WHERE id = " + req.params.id);
//     db.query(sql).then(results => {
//         console.log(results);
//         res.send(results)
//     });
// });

// Create a route for testing the db
app.get("/db_test", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from member';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});


// create a root for a list of members
app.get("/userlistpage", function(req,res){
    sql = "SELECT name, username FROM member";

    db.query(sql).then(results =>{
        console.log(results);
        res.send(results)
    });
});


// ORIGINAL PUG template utilizing
/*app.get("/userprofilepage/:username", function(req, res) {
    console.log("Views directory:", app.get("views"));
    console.log(req.params);
    sql = "SELECT id, username, name, email FROM member WHERE username = ?";
    
    db.query(sql, [req.params.username]).then(results => {
        if (results.length > 0) {
            console.log("rendering data: ", results[0]);
            res.render("member", { member: results[0] });
        } else {
            res.status(404).send("User not found");
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send("Database error");
    });
});*/

//proposed pug template code
app.get('/member/:username', async (req, res) => {
    try {
      const username = req.params.username;

      // First, get the member's ID using their username
      const memberQuery = `SELECT * FROM member WHERE username = ?`;
      const memberData = await db.query(memberQuery, [username]);

      // Check if the member exists
      if (memberData.length === 0) {
        return res.status(404).send('Member not found');
      }

      // Get the member's ID
      const memberId = memberData[0].id;

      // Now, fetch the data for activities, comments.pug, likes, etc.
      const activitiesQuery = `SELECT * FROM activity WHERE member_id = ?`;
      const activities = await db.query(activitiesQuery, [memberId]);

      const commentsQuery = `SELECT * FROM comment WHERE member_id = ?`;
      const comments = await db.query(commentsQuery, [memberId]);

      const communitiesQuery = `SELECT * FROM community WHERE id in (SELECT community_id FROM post WHERE writer_id = ?);`
      const communities = await db.query(communitiesQuery, [memberId]);

     /* const likesQuery = `SELECT * FROM likes_table WHERE member_id = ?`;
      const likes = await db.query(likesQuery, [memberId]);*/

      const postsQuery = `SELECT text FROM post WHERE writer_id = ?`;
      const posts = await db.query(postsQuery, [memberId]);

      const rewardsQuery = `SELECT * FROM reward WHERE community_id in (SELECT community_id FROM post WHERE writer_id = ?)`;
      const rewards = await db.query(rewardsQuery, [memberId]);

      // Render the member profile page with the fetched data
      res.render('member.pug', {
        member: memberData[0],
        activities: activities,
        comments: comments,
        communities: communities,
        //likes: likes,
        posts: posts,
        rewards: rewards
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving data');
    }
  });

//proposed pug template code
app.get('/members', async (req, res) => {
    try {
        const memberQuery = `SELECT * FROM member`;
        const memberData = await db.query(memberQuery);

        // Check if the member exists
        if (memberData.length === 0) {
            return res.status(404).send('Member not found');
        }

        // Render the member profile page with the fetched data
        res.render('members.pug', { memberData });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});

app.get('/activities/:username', async (req, res) => {
    try {
        const username = req.params.username;

        // First, get the member's ID using their username
        const memberQuery = `SELECT * FROM member WHERE username = ?`;
        const memberData = await db.query(memberQuery, [username]);

        // Check if the member exists
        if (memberData.length === 0) {
            return res.status(404).send('Member not found');
        }

        // Get the member's ID
        const memberId = memberData[0].id;
        const activityQuery = `SELECT * FROM activity WHERE member_id = ?`;
        const activityData = await db.query(activityQuery, [memberId]);

        // Check if the member exists
        if (activityData.length === 0) {
            return res.status(404).send('Member not found');
        }

        // Render the member profile page with the fetched data
        res.render('activities.pug', { username: username, activities: activityData });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});

app.get('/posts/:username', async (req, res) => {
    try {
        const username = req.params.username;

        // First, get the member's ID using their username
        const memberQuery = `SELECT * FROM member WHERE username = ?`;
        const memberData = await db.query(memberQuery, [username]);

        // Check if the member exists
        if (memberData.length === 0) {
            return res.status(404).send('Member not found');
        }

        // Get the member's ID
        const memberId = memberData[0].id;
        const postQuery = `SELECT * FROM post WHERE writer_id = ?`;
        const postData = await db.query(postQuery, [memberId]);

        // Check if the member exists
        if (postData.length === 0) {
            return res.status(404).send('Member not found');
        }

        // Render the member profile page with the fetched data
        res.render('posts.pug', {
            member: memberData[0],
            posts: postData });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});

app.get('/comments/:username', async (req, res) => {
    try {
        const username = req.params.username;

        // First, get the member's ID using their username
        const memberQuery = `SELECT * FROM member WHERE username = ?`;
        const memberData = await db.query(memberQuery, [username]);

        // Check if the member exists
        if (memberData.length === 0) {
            return res.status(404).send('Member not found');
        }

        // Get the member's ID
        const memberId = memberData[0].id;
        const commentQuery = `SELECT * FROM comment WHERE member_id = ?`;
        const commentData = await db.query(commentQuery, [memberId]);

        const postQuery = `SELECT * FROM post WHERE comment_id in (SELECT id FROM comment where)`;
        const postData = await db.query(commentQuery, [memberId]);

        // Check if the member exists
        if (commentData.length === 0) {
            return res.status(404).send('Member not found');
        }

        // Render the member profile page with the fetched data
        res.render('comments.pug', {
            member: memberData[0],
            comments: commentData,
            posts: postData,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});

app.get('/comment/:commentId', async (req, res) => {
    try {
        const commentId = req.params.commentId;

        // First, get the member's ID using their username
        const memberQuery = `SELECT * FROM member WHERE id in (SELECT member_id FROM comment WHERE id = ?)`;
        const memberData = await db.query(memberQuery, [commentId]);

        // Check if the member exists
        if (memberData.length === 0) {
            return res.status(404).send('Member not found');
        }

        // Get the member's ID
        const memberId = memberData[0].id;
        const commentQuery = `SELECT * FROM comment WHERE member_id = ?`;
        const commentData = await db.query(commentQuery, [memberId]);

        // Check if the member exists
        if (commentData.length === 0) {
            return res.status(404).send('Member not found');
        }

        // Render the member profile page with the fetched data
        res.render('comment.pug', {
            member: memberData[0],
            comments: commentData });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});

app.get('/post/:postId/:username', async (req, res) => {
    try {
        const postId = req.params.postId;
        const username = req.params.username;

        // First, get the member's ID using their username
        const memberQuery = `SELECT * FROM member WHERE username = ?`;
        const memberData = await db.query(memberQuery, [username]);

        // Check if the member exists
        if (memberData.length === 0) {
            return res.status(404).send('Member not found');
        }

        // Get the member's ID
        const memberId = memberData[0].id;
        const postQuery = `SELECT * FROM post WHERE id = ?`;
        const postData = await db.query(postQuery, [postId]);

        console.log("This is the postData: ", postData)

        // Check if the member exists
        if (postData.length === 0) {
            return res.status(404).send('Member not found');
        }

        // Render the member profile page with the fetched data
        res.render('post.pug', {
            member: memberData[0],
            posts: postData });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});

// feed route
app.get('/feed/:username', async (req, res) => {
    try {

      const username = req.params.username;
      const memberQuery = `SELECT * FROM member WHERE username = ?`;
      const memberData = await db.query(memberQuery, [username]);
  
      if (memberData.length === 0) {
        return res.status(404).send('Member not found');
      }
      
    const postsQuery = `
    SELECT p.text, m.username
    FROM post p
    JOIN member m ON p.writer_id = m.id
    ORDER BY p.id DESC
     `;
    const posts = await db.query(postsQuery);
      const memberId = memberData[0].id;
  
      // For demonstration, let's just select the posts from this member.
      // If you want an "Instagram-like" feed from multiple members, you'd
      // fetch more data. For now, we'll keep it simple.
      // Comments, likes, communities, etc. can also be fetched here if you want
      // to display them on the feed. For now, we’ll keep them minimal.
      // e.g. const commentsQuery = `...`; etc.
  
      // Render feed.pug
      res.render('feed.pug', {
        member: memberData[0],
        posts: posts
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving data');
    }
  });
  


app.get("/listingpage", function(req,res){
    sql = ("SELECT * FROM post")

    db.query(sql).then(results =>{
        console.log(results);
        res.send(results);
    });
});


//Create a page for a specific activity/post
app.get("/detailpage/:id", function(req,res){
    sql = ("SELECT * FROM post WHERE id = ?");
    db.query(sql, [req.params.id]).then(results =>{
        console.log(results);
        res.send(results);
    });
});


//create a page for finding posts based on the category
app.get("/tagscategories/:id", function(req,res){
    sql = ("SELECT * FROM activity WHERE type = ?");
    db.query (sql, [req.params.id]).then(results =>{
        console.log(results);
        res.send(results);
    });
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});