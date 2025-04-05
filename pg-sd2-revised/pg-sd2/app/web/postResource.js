const express = require("express");
const PostService = require("../service/PostService");

const router = express.Router();

// Get all posts with optional filtering and pagination
router.get("/", async (req, res) => {
    try {
        const { page = 1, pageSize = 10, search = "" } = req.query;
        const posts = await PostService.getAllPosts({
            page: parseInt(page),
            pageSize: parseInt(pageSize),
            search: search,
        });
        res.json(posts);
    } catch (error) {
        res.status(500).send("Error fetching posts.");
    }
});

// Get a post by ID
router.get("/:id", async (req, res) => {
    try {
        const post = await PostService.getPostById(req.params.id);
        if (post) {
            res.json(post);
        } else {
            res.status(404).send("Post not found.");
        }
    } catch (error) {
        res.status(500).send("Error fetching post.");
    }
});

// Create a post
router.post("/", async (req, res) => {
    try {
        const newPost = await PostService.createPost(req.body);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).send("Error creating post.");
    }
});

// Update a post
router.put("/:id", async (req, res) => {
    try {
        const updatedPost = await PostService.updatePost(req.params.id, req.body);
        if (updatedPost) {
            res.json(updatedPost);
        } else {
            res.status(404).send("Post not found.");
        }
    } catch (error) {
        res.status(500).send("Error updating post.");
    }
});

// Delete a post
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await PostService.deletePost(req.params.id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send("Post not found.");
        }
    } catch (error) {
        res.status(500).send("Error deleting post.");
    }
});

module.exports = router;
