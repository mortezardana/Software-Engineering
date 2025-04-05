const express = require("express");
const LikeService = require("../service/LikeService");

const router = express.Router();

// Like a post
router.post("/:postId", async (req, res) => {
    try {
        const newLike = await LikeService.likePost(req.params.postId, req.body);
        res.status(201).json(newLike);
    } catch (error) {
        res.status(500).send("Error liking post.");
    }
});

// Unlike a post
router.delete("/:postId", async (req, res) => {
    try {
        const deleted = await LikeService.unlikePost(req.params.postId, req.body);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send("Like not found.");
        }
    } catch (error) {
        res.status(500).send("Error unliking post.");
    }
});

module.exports = router;
