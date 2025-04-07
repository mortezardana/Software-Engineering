const express = require("express");
const ActivityService = require("../service/ActivityService");
require('dotenv').config();

const router = express.Router();

// Get all activities with optional filtering and pagination
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

router.get("/add-activity", (req, res) => {
    res.render("add-activity.pug", {
        mapboxToken: process.env.MAPBOX_PUBLIC_TOKEN
    });
});

router.post("/add-activity", async (req, res) => {
    const {
        type,
        averageSpeed,
        distance,
        elevation,
        movingTime,
        routeGeoJson
    } = req.body;

    console.log("Route drawn:", routeGeoJson); // should be a GeoJSON string

    // Save the routeGeoJson in your DB with the activity
    await ActivityService.createActivity({
        type,
        averageSpeed,
        distance,
        elevation,
        movingTime,
        routeGeoJson
    });

    res.redirect("/member/feed/" + req.session.username);
});

// Get an activity by ID
router.get("/:id", async (req, res) => {
    try {
        const activity = await ActivityService.getActivityById(req.params.id);
        let routeGeoJson = null;
        if (activity.routeGeoJson) {
            try {
                routeGeoJson = JSON.parse(activity.routeGeoJson);
            } catch (err) {
                console.error("Failed to parse GeoJSON:", err);
            }
        }
        if (activity) {
            res.render('activity.pug', {
                activity: activity,
                routeGeoJson: JSON.stringify(routeGeoJson), // Pass as string for pug
                mapboxToken: process.env.MAPBOX_PUBLIC_TOKEN
            });
        } else {
            res.status(404).send("Activity not found.");
        }
    } catch (error) {
        res.status(500).send("Error fetching activity.");
    }
});

// Update an activity
router.put("/:id", async (req, res) => {
    try {
        const updatedActivity = await ActivityService.updateActivity(req.params.id, req.body);
        if (updatedActivity) {
            res.json(updatedActivity);
        } else {
            res.status(404).send("Activity not found.");
        }
    } catch (error) {
        res.status(500).send("Error updating activity.");
    }
});

// Delete an activity
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

// GET form
router.get("/new", (req, res) => {
    if (!req.session.user) return res.redirect("/login");

    res.render("newActivity.pug", {
        user: req.session.user,
        title: "Add Activity"
    });
});

// POST handler (simplified)
router.post("/", async (req, res) => {
    try {
        const activity = {
            ...req.body,
            member: req.session.user.id
        };
        await ActivityService.createActivity(activity);
        res.redirect(`/members/feed/${req.session.user.username}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating activity.");
    }
});

module.exports = router;
