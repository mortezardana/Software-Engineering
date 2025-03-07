// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

// Get the functions in the db.js file to use
const db = require('./services/db');

// Create a route for root - /
app.get("/", function(req, res) {
    res.send("Hello Dexter!");
});

//Create a route for /roehampton

app.get("/roehampton",function(req,res){
    console.log(req.url)
    let path = req.url;
    res.send(path.substring(0,3));
});

app.get("/hello/:name", function(req,res){
    console.log(req.params);
    res.send("Hello " + req.params.name);
});

app.get("/user/:id", function(req,res){
    console.log(req.params);
    res.send(req.params.id);
});

app.get("/student/:name/:id", function(req,res){
    console.log(req.params);
    let name = req.params.name;
    let id = req.params.id;
    let output = "";

    output += `<HTML>
    <table id="myTable" border=1>
        <tr>
            <td>name</td>
            <td>id</td>
        </tr>
    </table>
    </HTML>`;
    
    res.send(output);
});

app.get("/db_test/:id", function(req,res){
    console.log(req.params);
    let sql = ("SELECT * from test_table WHERE id = " + req.params.id);
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});

// Create a route for testing the db
app.get("/db_test", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from test_table';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});

// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/goodbye", function(req, res) {
    res.send("Goodbye world!");
});

// Create a dynamic route for /hello/<name>, where name is any value provided by user
// At the end of the URL
// Responds to a 'GET' request
app.get("/hello/:name", function(req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    //  Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});

app.get("/userlistpage", function(req,res){
    res.send("This is the User List Page");
});

app.get("/userprofilepage", function(req,res){
    res.send("This is the User Profile Page");
});

app.get("/listingpage", function(req,res){
    res.send("This is the listing page, containing all activities on a feed")
});

app.get("/detailpage", function(req,res){
    res.send("This is a detail page, showing one instance of any activity")
});

app.get("/tags-categories", function(req,res){
    res.send("This is a tages and categories page, used to search activities based on their type (running, cycling, walking)")
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});