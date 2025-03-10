// Import express.js
const express = require("express");
const MemberService = require("../service/MemberService");

const router = express.Router();

// Get all members with optional filtering and pagination
router.get("/", async (req, res) => {
    try {
        const { page = 1, pageSize = 10, search = "" } = req.query;

        const members = await MemberService.getAllMembers({
            page: parseInt(page),
            pageSize: parseInt(pageSize),
            search: search,
        });

        res.json(members);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching members.");
    }
});

// Get a member by ID
router.get("/:id", async (req, res) => {
    try {
        const member = await MemberService.getMemberById(req.params.id);

        if (member) {
            res.json(member);
        } else {
            res.status(404).send("Member not found.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching the member.");
    }
});

// Create a new member
router.post("/", async (req, res) => {
    try {
        const newMember = await MemberService.createMember(req.body);
        res.status(201).json(newMember);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while creating the member.");
    }
});

// Update a member by ID
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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

module.exports = router;
