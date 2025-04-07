const express = require("express");
const requireLogin = require("../middleware/auth").requireLogin;
const ActivityService = require("../service/ActivityService");
const MemberService = require("../service/MemberService");
require('dotenv').config();

const router = express.Router();

// GET: All activities with filtering and pagination
router.get("/", async (req, res) => {
    try {
        const { page = 1, pageSize = 10, search = "" } = req.query;
        const activities = await ActivityService.getAllActivities({
            page: parseInt(page),
            pageSize: parseInt(pageSize),
            search: search,
        });
        res.json(activities);
    } catch (error) {
        res.status(500).send("Error fetching activities.");
    }
});

// GET: Show add-activity form
router.get("/new", requireLogin, (req, res) => {
    res.render("add-activity.pug", {
        mapboxToken: process.env.MAPBOX_PUBLIC_TOKEN
    });
});

router.post("/add-activity", async (req, res) => {
    const member = await MemberService.getMemberByUsername(req.session.username);
    const memberId = member.id;
    const {
        type,
        averageSpeed,
        distance,
        elevation,
        movingTime,
        routeGeoJson
    } = req.body;

        const activityData = {
            type,
            averageSpeed: parseFloat(averageSpeed),
            distance: parseFloat(distance),
            elevation: parseFloat(elevation),
            movingTime,
            member: member.id,
            routeGeoJson
        };

    // Save the routeGeoJson in your DB with the activity
    await ActivityService.createActivity({
        type,
        averageSpeed,
        distance,
        memberId,
        elevation,
        movingTime,
        routeGeoJson
    });

    res.redirect("/member/feed/" + req.session.username);
});

// GET: View a single activity
router.get("/:id", async (req, res) => {
    try {
        const activity = await ActivityService.getActivityById(req.params.id);
        let routeGeoJson = null;

        if (activity.routeGeoJson) {
            try {
                routeGeoJson = JSON.parse(activity.routeGeoJson);
                activity.routeGeoJson = JSON.stringify(routeGeoJson);
            } catch (err) {
                console.error("Failed to parse GeoJSON:", err);
            }
        }

        if (activity) {
            res.render('activity.pug', {
                activity,
                routeGeoJson: JSON.stringify(routeGeoJson),
                mapboxToken: process.env.MAPBOX_TOKEN
            });
        } else {
            res.status(404).send("Activity not found.");
        }
    } catch (error) {
        res.status(500).send("Error fetching activity.");
    }
});

// PUT: Update an activity
router.put("/:id", async (req, res) => {
    try {
        const updated = await ActivityService.updateActivity(req.params.id, req.body);
        if (updated) {
            res.json(updated);
        } else {
            res.status(404).send("Activity not found.");
        }
    } catch (error) {
        res.status(500).send("Error updating activity.");
    }
});

// DELETE: Delete an activity
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await ActivityService.deleteActivity(req.params.id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send("Activity not found.");
        }
    } catch (error) {
        res.status(500).send("Error deleting activity.");
    }
});

module.exports = router;
