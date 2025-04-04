// Import express.js
const path = require("path");
const express = require("express");
const bcrypt = require('bcryptjs');


// Create express app
const app = express();
app.use(express.urlencoded({ extended: true }));

// Add static files location
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

// Get the functions in the db.js file to use
const db = require('./services/db');
const { createPool } = require("mysql2");
const { Member } = require("./entity/member");

var session = require('express-session');
app.use(session({
  secret: 'secretkeysdfjsflyoifasd',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// TODO: Need to implement a home page with buttons/cards for each entity listing page and render it here in the root route.
// Create a route for root - /
app.get("/", function(req, res) {
    res.render('home-page.pug');
});

app.get("/about-us", function(req, res) {
    res.render('about-us.pug');
});

// TODO: This endpoint should either change to members (which is already implemented) or change the result that it returns.
// create a root for a list of members
app.get("/userlistpage", function(req,res){
    sql = "SELECT name, username FROM member";

    db.query(sql).then(results =>{
        console.log(results);
        res.send(results)
    });
});

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
app.get('/member/id/:memberId', async (req, res) => {
    try {
      const memberId = req.params.memberId;

      const memberQuery = `SELECT * FROM member WHERE id = ?`;
      const memberData = await db.query(memberQuery, [memberId]);

      // Check if the member exists
      if (memberData.length === 0) {
        return res.status(404).send('Member not found');
      }

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
            return res.status(404).send('Member not found with username in activities list');
        }

        // Get the member's ID
        const memberId = memberData[0].id;
        const activityQuery = `SELECT * FROM activity WHERE member_id = ?`;
        const activityData = await db.query(activityQuery, [memberId]);

        // Check if the member exists
        if (activityData.length === 0) {
            return res.status(404).send('Activity not found with username in activities list');
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
            return res.status(404).send('Member not found with username in posts list');
        }

        // Get the member's ID
        const memberId = memberData[0].id;
        const postQuery = `SELECT * FROM post WHERE writer_id = ?`;
        const postData = await db.query(postQuery, [memberId]);

        // Check if the member exists
        if (postData.length === 0) {
            return res.status(404).send('Posts not found with username in posts list');
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
            return res.status(404).send('Member not found in comments list with username');
        }

        // Get the member's ID
        const memberId = memberData[0].id;
        const commentQuery = `SELECT * FROM comment WHERE member_id = ?`;
        const commentData = await db.query(commentQuery, [memberId]);

        const postQuery = `SELECT * FROM post WHERE comment_id in (SELECT id FROM comment where)`;
        const postData = await db.query(commentQuery, [memberId]);

        // Check if the member exists
        if (commentData.length === 0) {
            return res.status(404).send('Comments not found with username in comment list');
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
            return res.status(404).send('Member not found with comment id in single comment');
        }

        // Get the member's ID
        const memberId = memberData[0].id;
        const commentQuery = `SELECT * FROM comment WHERE member_id = ?`;
        const commentData = await db.query(commentQuery, [memberId]);

        // Check if the member exists
        if (commentData.length === 0) {
            return res.status(404).send('Comment not found with id in single comment');
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
            return res.status(404).send('Member not found with username in single post');
        }

        // Get the member's ID
        const memberId = memberData[0].id;
        const postQuery = `SELECT * FROM post WHERE id = ?`;
        const postData = await db.query(postQuery, [postId]);

        console.log("This is the postData: ", postData)

        // Check if the member exists
        if (postData.length === 0) {
            return res.status(404).send('post not found with username and post id in single post');
        }

        // Render the member profile page with the fetched data
        res.render('post.pug', {
            member: memberData[0],
            post: postData[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});

app.get('/post/id/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;

        const postQuery = `SELECT * FROM post WHERE id = ?`;
        const postData = await db.query(postQuery, [postId]);

        console.log("This is the postData: ", postData)

        // Check if the member exists
        if (postData.length === 0) {
            return res.status(404).send('post not found with id');
        }

        // Render the member profile page with the fetched data
        res.render('post.pug', {
            member: memberData[0],
            post: postData[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});

app.get('/comment/:commentId/:username', async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const username = req.params.username;

        // First, get the member's ID using their username
        const memberQuery = `SELECT * FROM member WHERE username = ?`;
        const memberData = await db.query(memberQuery, [username]);

        // Check if the member exists
        if (memberData.length === 0) {
            return res.status(404).send('Member not found with username');
        }

        // Get the member's ID
        const memberId = memberData[0].id;
        const commentQuery = `SELECT * FROM comment WHERE id = ?`;
        const commentData = await db.query(commentQuery, [commentId]);

        console.log("This is the postData: ", commentData)

        // Check if the member exists
        if (commentData.length === 0) {
            return res.status(404).send('Comment not found with id and username');
        }

        // Render the member profile page with the fetched data
        res.render('comment.pug', {
            member: memberData[0],
            comment: commentData });
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
            return res.status(404).send('member not found with username in comments list');
        }

        // Get the member's ID
        const memberId = memberData[0].id;
        const commentQuery = `SELECT * FROM comment WHERE member_id = ?`;
        const commentData = await db.query(commentQuery, [memberId]);

        console.log("This is the postData: ", commentData)

        // Check if the member exists
        if (commentData.length === 0) {
            return res.status(404).send('Comments not found in comments list');
        }

        // Render the member profile page with the fetched data
        res.render('comments.pug', {
            member: memberData[0],
            comments: commentData });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});

// TODO: Another endpoint should be implemented after the connection between the community and member is designed and implemented in the database. that connection should store all the members joined in each community.
app.get('/community/:communityId', async (req, res) => {
    try {
        const communityId = req.params.communityId;

        const communityQuery = `SELECT * FROM community WHERE id = ?`;
        const communityData = await db.query(communityQuery, [communityId]);

        console.log("This is the postData: ", communityData)

        // Check if the member exists
        if (communityData.length === 0) {
            return res.status(404).send('Community not found with id');
        }

        // Render the member profile page with the fetched data
        res.render('community.pug', {
            community: communityData[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});

app.get('/communities', async (req, res) => {
    try {
        const communityQuery = `SELECT * FROM community`;
        const communityData = await db.query(communityQuery);

        console.log("This is the postData: ", communityData)

        // Check if the member exists
        if (communityData.length === 0) {
            return res.status(404).send('Communities not found');
        }

        // Render the member profile page with the fetched data
        res.render('communities.pug', {
            communities: communityData });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});

app.get('/communities-membership/:communityId', async (req, res) => {
    try {
        const communityId = req.params.communityId;

        const communityMembershipQuery = `SELECT * FROM community_membership WHERE community_id = ?`;
        const communityMembershipData = await db.query(communityMembershipQuery, [communityId]);


        const communityQuery = `SELECT * FROM community WHERE id = ?`;
        const communityData = await db.query(communityQuery, [communityId]);

        console.log("This is the postData: ", communityMembershipData)

        // Check if the member exists
        if (communityMembershipData.length === 0) {
            return res.status(404).send('Community not found in communities for a member with community id');
        }

        // Render the member profile page with the fetched data
        res.render('community_membership.pug', {
            communitiesMembership: communityMembershipData,
            communityName: communityData[0].name,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});

app.get('/member-communities/:memberId', async (req, res) => {
    try {
        const memberId = req.params.memberId;

        const communityMembershipQuery = `SELECT community_id FROM community_membership WHERE member_id = ?`;
        const communityMembershipData = await db.query(communityMembershipQuery, [memberId]);

        console.log("member-communities: ", communityMembershipData)


        const communityQuery = `SELECT * FROM community WHERE id in (SELECT community_id FROM community_membership WHERE member_id = ?)`;
        const communityData = await db.query(communityQuery, [memberId]);

        console.log("This is the postData: ", communityMembershipData)

        // Check if the member exists
        if (communityMembershipData.length === 0) {
            return res.status(404).send('Community membership not found with member id');
        }

        // Render the member profile page with the fetched data
        res.render('communities.pug', {
            communities: communityData,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});

app.get('/activity/:activityId/:username', async (req, res) => {
    try {
        const activityId = req.params.activityId;
        const username = req.params.username;

        const memberQuery = `SELECT * FROM member WHERE username = ?`;
        const memberData = await db.query(memberQuery, [username]);

        // Check if the member exists
        if (memberData.length === 0) {
            return res.status(404).send('Activity not found with id and username');
        }

        // Get the member's ID
        const memberId = memberData[0].id;
        const activityQuery = `SELECT * FROM activity WHERE id = ?`;
        const activityData = await db.query(activityQuery, [activityId]);


        console.log("This is the postData: ", activityData)

        // Check if the member exists
        if (activityData.length === 0) {
            return res.status(404).send('Activity not found');
        }

        // Render the member profile page with the fetched data
        res.render('activity.pug', {
            activity: activityData[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});

app.get('/activity-id/:activityId', async (req, res) => {
    try {
        const activityId = req.params.activityId;

        const activityQuery = `SELECT * FROM activity WHERE id = ?`;
        const activityData = await db.query(activityQuery, [activityId]);


        console.log("This is the activity data: ", activityData[0])

        // Check if the member exists
        if (activityData.length === 0) {
            return res.status(404).send('Activity not found with id');
        }

        // Render the member profile page with the fetched data
        res.render('activity.pug', {
            activity: activityData[0] });
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
        return res.status(404).send('Member not found in feed with username');
      }
      
    const postsQuery = `
    SELECT p.text, m.username, COUNT(DISTINCT c.id) AS comment_count, COUNT(DISTINCT l.id) AS like_count
    FROM post p
    JOIN member m ON p.writer_id = m.id
    LEFT JOIN comment c ON p.id = c.post_id
    LEFT JOIN likes_table l ON p.id = l.post_id
    GROUP BY p.id, p.text, m.username
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
      console.log(posts);
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

app.get("/login", function(req,res){
    res.render("login.pug");
});


app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/login');
  });

  
app.get("/sign-up", function(req,res){
    res.render("sign-up.pug");

});

app.post('/set-password', async function (req, res) {
    params = req.body;
    const {email, username, password} = params;
    console.log("request body: ", req.body);

    if(!email || !username || !password){
        return res.render("sign-up.pug", {error: "All fields are required."});
    }
    var member = new Member(null, params.username, null, params.email, null, [], [], [], [], [], []);
    console.log(params.username);
    try {
        uId = await member.getIdFromEmail();
        console.log(uId);
        if (uId) {
            // If a valid, existing user is found, set the password and redirect to the users single-student page
            
            await member.setMemberPassword(params.password);
            console.log(req.session.id);
            res.redirect('/login');
        }
        else {
            // If no existing user is found, add a new one
            console.log(member);
            newId = await member.addMember(params.password, params.username);
            res.redirect('/login');
        }
    } catch (err) {
        console.error(`Error while adding password `, err.message);
    }
});

app.post('/authenticate', async function (req, res) {
    params = req.body;
    console.log(Member)
    console.log("Request body:", req.body);
    var member = new Member(null, params.username, null, params.email, null, [], [], [], [], [], []);
    try {
        username = await member.getUsernameFromEmail();
        if (username) {
            match = await member.authenticate(params.password);
            if (match) {
                req.session.username = username;
                req.session.loggedIn = true;
                res.redirect('/feed/' + username);
            }
            else {
                // TODO improve the user journey here
                res.render("login.pug", {error: "Invalid Password", email: params.email});
            }
        }
        else {
            res.render("login.pug", {error: "Invalid Email", email: params.email});
        }
    } catch (err) {
        console.error(`Error while comparing `, err.message);
    }
});