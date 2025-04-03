// Import express.js
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

// Import routes
// const routes = require((path.join(__dirname, "./route")));

// Create express app
var app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Add static files location
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "pug");
app.set("views", __dirname + "/view");

// Get the functions in the db.js file to use
const db = require('./service/db');
const ActivityResource = require('./web/ActivityResource');
console.log("Activity Resource: ", ActivityResource);
const CommentResource = require("./web/CommentResource");
const CommunityResource = require("./web/CommunityResource");
const LikeResource = require("./web/LikeResource");
const MemberResource = require("./web/MemberResource");
const PostResource = require("./web/PostResource");
// const RewardResource = require("./web/RewardResource");

const router = express.Router();

// Mount API routes
app.use("/api", router);

app.use('/activity', ActivityResource);
app.use('/comment', CommentResource);
app.use('/community', CommunityResource);
app.use('/like', LikeResource);
app.use('/member', MemberResource);
app.use('/post', PostResource);
// router.use('/reward', RewardResource);


// Create a route for root - /
app.get("/", function(req, res) {
    res.render("home-page.pug");
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});
