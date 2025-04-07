// Import express.js
const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const { requireLogin } = require("./middleware/auth");

// Import routes
// const routes = require((path.join(__dirname, "./route")));

// Create express app
const app = express();
const server = http.createServer(app); // <--- use http server
const io = socketIO(server);           // <--- attach Socket.IO to server

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add static files location
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "pug");
app.set("views", __dirname + "/view");

// Get the functions in the db.js file to use
const db = require('./service/db');
const ActivityResource = require('./web/ActivityResource');
const CommentResource = require("./web/CommentResource");
const CommunityResource = require("./web/CommunityResource");
const LikeResource = require("./web/LikeResource");
const MemberResource = require("./web/memberResource");
const PostResource = require("./web/PostResource");
const Member = require("./model/Member");
const MemberService = require("./service/MemberService");
// const RewardResource = require("./web/RewardResource");

var session = require('express-session');
app.use(session({
    secret: 'secretkeysdfjsflyoifasd',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const router = express.Router();

app.use((req, res, next) => {
    res.locals.loggedIn = req.session.loggedIn || false;
    res.locals.username = req.session.username || null;
    res.locals.memberId = req.session.memberId || null;
    next();
});



// Mount API routes
app.use("/api", router);

app.use('/activity', requireLogin, ActivityResource);
app.use('/comment', requireLogin, CommentResource);
app.use('/community', requireLogin, CommunityResource);
app.use('/like', requireLogin, LikeResource);
app.use('/member', requireLogin, MemberResource);
app.use('/post', requireLogin, PostResource);
// router.use('/reward', RewardResource);


// Create a route for root - /
app.get("/", function(req, res) {
    const loggedIn = req.session.loggedIn || false;
    const username = req.session.username || null;
    res.render('landing.pug', { loggedIn, username });
});

app.get("/home", requireLogin, function(req, res){
    const loggedIn = req.session.loggedIn || false;
    const username = req.session.username || null;
    res.render("home-page.pug", {loggedIn, username} );
});

app.get("/login", function(req,res){
    if (req.session.loggedIn && req.session.username) {
        return res.redirect(`/member/feed/${req.session.username}`);
    }
    const loggedIn = req.session.loggedIn || false;
    res.render('login.pug', { loggedIn });
});


app.get('/logout', function (req, res) {
    // Destroy the session to log out the user
    req.session.destroy(function (err) {
        if (err) {
            return res.status(500).send('Failed to log out');
        }

        // Redirect to the login page or home page after logging out
        res.redirect('/login');  // You can change this to wherever you want the user to go
    });
});


app.get("/sign-up", function(req,res){
    if (req.session.loggedIn && req.session.username) {
        return res.redirect(`/member/feed/${req.session.username}`);
    }
    res.render("sign-up.pug");

});

app.get("/about-us", function(req,res){
    if (req.session.loggedIn && req.session.username) {
        res.render("about-us.pug");
    }
});

app.post('/set-password', async function (req, res) {
    params = req.body;
    const {email, username, password} = params;

    if(!email || !username || !password){
        return res.render("sign-up.pug", {error: "All fields are required."});
    }
    try {
        uId = await MemberService.getIdFromEmail(email);
        if (uId) {
            // If a valid, existing user is found, set the password and redirect to the users single-student page

            await MemberService.setMemberPassword(password, uId);
            res.redirect('/login');
        }
        else {
            // If no existing user is found, add a new one
            await MemberService.addMember(password, username, email);
            res.redirect('/login');
        }
    } catch (err) {
        console.error(`Error while adding password `, err.message);
    }
});

app.post('/authenticate', async function (req, res) {
    params = req.body;
    try {
        const username = await MemberService.getUsernameFromEmail(params.email);
        const memberId = await MemberService.getIdFromEmail(params.email);
        if (username) {
            const match = await MemberService.authenticate(params.password, username);
            if (match) {
                req.session.username = username;
                req.session.loggedIn = true;
                req.session.memberId = memberId;
                res.redirect('/member/feed/' + req.session.username);
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

app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).send("Internal Server Error");
});

// Start server on port 3000
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});

const activeUsers = {};

io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("register", (username) => {
        activeUsers[username] = socket.id;
        console.log(`User registered: ${username}`);
    });

    socket.on("private_message", ({ to, from, message }) => {
        const target = activeUsers[to];
        if (target) {
            io.to(target).emit("private_message", { from, message });
        }
    });

    socket.on("disconnect", () => {
        for (const username in activeUsers) {
            if (activeUsers[username] === socket.id) {
                delete activeUsers[username];
                break;
            }
        }
        console.log("Socket disconnected:", socket.id);
    });
});
