// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));
app.use(express.static('public'));

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

// Get the functions in the db.js file to use
const db = require('./services/db');
const { createPool } = require("mysql2");

// Create a route for root - /
app.get("/", function(req, res) {
    res.send("Hello Dexter!");
});

//Create a route for /roehampton

// app.get("/roehampton",function(req,res){
//     console.log(req.url)
//     let path = req.url;
//     res.send(path.substring(0,3));
// });

// app.get("/hello/:name", function(req,res){
//     console.log(req.params);
//     res.send("Hello " + req.params.name);
// });

// app.get("/user/:id", function(req,res){
//     console.log(req.params);
//     res.send(req.params.id);
// });

// app.get("/student/:name/:id", function(req,res){
//     console.log(req.params);
//     let name = req.params.name;
//     let id = req.params.id;
//     let output = "";

//     output += `<HTML>
//     <table id="myTable" border=1>
//         <tr>
//             <td>name</td>
//             <td>id</td>
//         </tr>
//     </table>
//     </HTML>`;
    
//     res.send(output);
// });

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

// Create a route for /goodbye
// Responds to a 'GET' request
// app.get("/goodbye", function(req, res) {
//     res.send("Goodbye world!");
// });

// Create a dynamic route for /hello/<name>, where name is any value provided by user
// At the end of the URL
// Responds to a 'GET' request
// app.get("/hello/:name", function(req, res) {
//     // req.params contains any parameters in the request
//     // We can examine it in the console for debugging purposes
//     console.log(req.params);
//     //  Retrieve the 'name' parameter and use it in a dynamically generated page
//     res.send("Hello " + req.params.name);
// });

// create a root for a list of members
app.get("/userlistpage", function(req,res){
    sql = "SELECT name, username FROM member";

    db.query(sql).then(results =>{
        console.log(results);
        res.send(results)
    });
});

/*app.get("/userprofilepage/:username", function(req,res){
    console.log(req.params);
    sql = ("SELECT username, name FROM member WHERE username = ?");
    
    db.query(sql, [req.params.username]).then(results => {
        console.log(results);
        res.send(results);
    })
});*/


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
      const memberQuery = `SELECT * FROM members WHERE username = ?`;
      const memberData = await db.query(memberQuery, [username]);
  
      // Check if the member exists
      if (memberData.length === 0) {
        return res.status(404).send('Member not found');
      }
  
      // Get the member's ID
      const memberId = memberData[0].id;
  
      // Now, fetch the data for activities, comments, likes, etc.
      const activitiesQuery = `SELECT * FROM activities WHERE member_id = ?`;
      const activities = await db.query(activitiesQuery, [memberId]);
  
      const commentsQuery = `SELECT * FROM comments WHERE member_id = ?`;
      const comments = await db.query(commentsQuery, [memberId]);
  
      const communitiesQuery = `SELECT * FROM communities WHERE member_id = ?`;
      const communities = await db.query(communitiesQuery, [memberId]);
  
      const likesQuery = `SELECT * FROM likes WHERE member_id = ?`;
      const likes = await db.query(likesQuery, [memberId]);
  
      const postsQuery = `SELECT * FROM posts WHERE member_id = ?`;
      const posts = await db.query(postsQuery, [memberId]);
  
      const rewardsQuery = `SELECT * FROM rewards WHERE member_id = ?`;
      const rewards = await db.query(rewardsQuery, [memberId]);
  
      // Render the member profile page with the fetched data
      res.render('member-profile', {
        member: memberData[0],
        activities: activities,
        comments: comments,
        communities: communities,
        likes: likes,
        posts: posts,
        rewards: rewards
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