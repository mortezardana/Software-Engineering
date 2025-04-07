const express = require("express");
const CommunityService = require("../service/CommunityService");
const MemberService = require("../service/MemberService");

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

        const member = await MemberService.getMemberByUsername(req.session.username);

        const communityOfMember = await CommunityService.getAllJoinedCommunitiesOfMember(member.id);

        console.log("Community member:", communityOfMember);
        const joinedIds = communityOfMember.map(c => c.community_id);

        console.log("Joined community IDs:", joinedIds);

        res.render("communities.pug", {
            communities,
            joinedIds
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching communities.");
    }
});


// Get a community by ID
router.get("/:id", async (req, res) => {
    try {
        const community = await CommunityService.getCommunityById(req.params.id);
        if (community) {
            res.render('community.pug', {
                community: community
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

router.post("/join-community/:communityId", async (req, res) => {
    try {
        
        console.log("Attempting to join community...");
        const memberId = req.session.memberId;  // Assuming you're storing the user ID in `req.user`
        const communityId = req.params.communityId;  // Get the communityId from the URL parameter
        console.log("memberId: ", memberId);
        console.log("communityId: ", communityId);
      
      // Join the community
        await CommunityService.joinCommunity(memberId, communityId);
  
      // Redirect back to the communities page or show a success message
        res.redirect('/community');  // Or whichever URL you want to redirect to
        } catch (error) {
        console.log(error);  // Log the error for debugging
        res.status(500).send("Error joining the community.");
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

router.get("/my-communities/:memberId", async (req, res) => {
    try {
        const member = await MemberService.getMemberByUsername(req.session.username);

        // Get the communities the user is a part of
        const { communities, joinedIds } = await CommunityService.getMyCommunities(member.id);

        // Render the page with the communities and joinedIds
        res.render("communities.pug", {
            communities: communities.map(c => c.toJSON()),  // Convert to JSON
            joinedIds: joinedIds  // Pass the joinedIds
        });
    } catch (error) {
        res.status(500).send("Error fetching communities.");
    }
});

router.get("/communities-membership/:communityId", async (req, res) => {
    try {
        const communityMembership = await CommunityService.getCommunityMembership(req.params.communityId);
        const community = await CommunityService.getCommunityById(req.params.communityId);
        if (communityMembership) {
            res.render("community_membership.pug", {
                communitiesMembership: communityMembership,
                communityName: community.name
            });
        }
    } catch (e) {
        res.status(500).send("Error fetching community members" + e);
    }
});

module.exports = router;
