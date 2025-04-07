const express = require("express");
const CommunityService = require("../service/CommunityService");

const router = express.Router();

// Get all communities with optional filtering and pagination
router.get("/", async (req, res) => {
    try {
        const { page = 1, pageSize = 10, search = "" } = req.query;
        const communities = await CommunityService.getAllCommunities({
            page: parseInt(page),
            pageSize: parseInt(pageSize),
            search: search,
        });

        res.render('communities.pug', {
            communities: communities.map(c => c.toJSON())
          });
    } catch (error) {
        res.status(500).send("Error fetching communities.");
    }
});

// Get a community by ID
router.get("/:id", async (req, res) => {
    try {
        const community = await CommunityService.getCommunityById(req.params.id);
        const members = await CommunityService.getAllMembersOfCommunity(community.id);
        if (community) {
            res.render('community.pug', {
                community: community,
                members: members
            });
        } else {
            res.status(404).send("Community not found.");
        }
    } catch (error) {
        res.status(500).send("Error fetching community.");
    }
});

// Create a community
router.post("/", async (req, res) => {
    try {
        const newCommunity = await CommunityService.createCommunity(req.body);
        res.status(201).json(newCommunity);
    } catch (error) {
        res.status(500).send("Error creating community.");
    }
});

// Update a community
router.put("/:id", async (req, res) => {
    try {
        const updatedCommunity = await CommunityService.updateCommunity(req.params.id, req.body);
        if (updatedCommunity) {
            res.json(updatedCommunity);
        } else {
            res.status(404).send("Community not found.");
        }
    } catch (error) {
        res.status(500).send("Error updating community.");
    }
});

// Delete a community
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await CommunityService.deleteCommunity(req.params.id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send("Community not found.");
        }
    } catch (error) {
        res.status(500).send("Error deleting community.");
    }
});

module.exports = router;
