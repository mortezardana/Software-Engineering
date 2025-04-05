const express = require("express");
const CommentService = require("../service/CommentService");

const router = express.Router();

// Get all comments for a specific post with optional filtering and pagination
router.get("/:postId", async (req, res) => {
    try {
        const { page = 1, pageSize = 10, search = "" } = req.query;
        const comments = await CommentService.getCommentsByPostId({
            postId: req.params.postId,
            page: parseInt(page),
            pageSize: parseInt(pageSize),
            search: search,
        });
        res.json(comments);
    } catch (error) {
        res.status(500).send("Error fetching comments.");
    }
});

// Create a comment
router.post("/:postId", async (req, res) => {
    try {
        const newComment = await CommentService.createComment(req.params.postId, req.body);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).send("Error creating comment.");
    }
});

// Update a comment
router.put("/:commentId", async (req, res) => {
    try {
        const updatedComment = await CommentService.updateComment(req.params.commentId, req.body);
        if (updatedComment) {
            res.json(updatedComment);
        } else {
            res.status(404).send("Comment not found.");
        }
    } catch (error) {
        res.status(500).send("Error updating comment.");
    }
});

// Delete a comment
router.delete("/:commentId", async (req, res) => {
    try {
        const deleted = await CommentService.deleteComment(req.params.commentId);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send("Comment not found.");
        }
    } catch (error) {
        res.status(500).send("Error deleting comment.");
    }
});

module.exports = router;
