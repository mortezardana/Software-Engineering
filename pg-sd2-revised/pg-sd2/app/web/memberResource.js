// Import express.js
const express = require("express");
const MemberService = require("../service/MemberService");
const ActivityService = require("../service/ActivityService");
const PostService = require("../service/PostService");
const { requireLogin } = require("../middleware/auth");

const router = express.Router();

// Get all members with optional filtering and pagination
router.get("/", requireLogin, async (req, res) => {
    try {
        const { page = 1, pageSize = 10, search = "" } = req.query;

        const members = await MemberService.getAllMembers({
            page: parseInt(page),
            pageSize: parseInt(pageSize),
            search: search,
        });

        res.render("members.pug", {
            memberData: members
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching members.");
    }
});

// Get all members with optional filtering and pagination
router.get("/feed/:username", requireLogin, async (req, res) => {
    try {
        const { page = 1, pageSize = 10, search = "" } = req.query;

        const username = req.session.username;

        const member = await MemberService.getMemberByUsername(username);

        const posts = await PostService.getPostByMemberId(member.id);


        res.render('feed.pug', {
            member: member,
            posts: posts,
            username: username
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching members.");
    }
});

// Get a member by ID
router.get("/id/:id", requireLogin, async (req, res) => {
    try {
        const member = await MemberService.getMemberById(req.params.id);

        if (member) {
            res.json(member);
        } else {
            res.status(404).send("Member not found.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching the member by id.");
    }
});


// Get a member by Username
router.get("/:username", requireLogin, async (req, res) => {
    try {
        const username = req.session.username;
        const member = await MemberService.getMemberByUsername(username);

        if (member) {
            res.render("member.pug", {
                member: member,
            });
        } else {
            res.status(404).send("Member not found.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching the member by username.");
    }
});


// Get activities of a member by username
router.get("/activities/:username", requireLogin, async (req, res) => {
    try {
        const member = await MemberService.getMemberById(req.params.id);

        if (member) {
            res.json(member);
        } else {
            res.status(404).send("Member not found.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching the member's activities.");
    }
});


// Get posts of a member by username
router.get("/posts/:username", requireLogin, async (req, res) => {
    try {
        const member = await MemberService.getMemberById(req.params.id);

        if (member) {
            res.json(member);
        } else {
            res.status(404).send("Member not found.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching the member's activities.");
    }
});

// Create a new member
router.post("/", requireLogin, async (req, res) => {
    try {
        const newMember = await MemberService.createMember(req.body);
        res.status(201).json(newMember);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while creating the member.");
    }
});

// Update a member by ID
router.put("/id/:id", requireLogin, async (req, res) => {
    try {
        const updatedMember = await MemberService.updateMember(req.params.id, req.body);
        if (updatedMember) {
            res.json(updatedMember);
        } else {
            res.status(404).send("Member not found.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while updating the member.");
    }
});

// Delete a member by ID
router.delete("/id/:id", requireLogin, async (req, res) => {
    try {
        const deleted = await MemberService.deleteMember(req.params.id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send("Member not found.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while deleting the member.");
    }
});

router.get("/profile/:username", requireLogin, async (req, res) => {
    try {
        const member = await MemberService.getMemberByUsername(req.session.username);
        const activities = await ActivityService.getActivitiesByMemberId(member.id);

        // Calculate stats
        const stats = {
            totalDistance: 0,
            totalTime: 0,
            totalElevation: 0,
            avgSpeed: 0,
        };

        if (activities.length) {
            stats.totalDistance = activities.reduce((acc, a) => acc + a.distance, 0);
            stats.totalTime = activities.reduce((acc, a) => acc + a.movingTime, 0);
            stats.totalElevation = activities.reduce((acc, a) => acc + a.elevation, 0);
            stats.avgSpeed = (activities.reduce((acc, a) => acc + a.averageSpeed, 0) / activities.length).toFixed(1);
        }

        res.render("profile.pug", {
            member,
            activities,
            stats
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading profile");
    }
});


module.exports = router;
