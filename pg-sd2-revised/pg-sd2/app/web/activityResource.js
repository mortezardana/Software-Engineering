const express = require("express");
const ActivityService = require("../service/ActivityService");

const router = express.Router({ mergeParams: true });

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

// Get an activity by ID
router.get("/:id", async (req, res) => {
    try {
        const activity = await ActivityService.getActivityById(req.params.id);
        if (activity) {
            res.json(activity);
        } else {
            res.status(404).send("Activity not found.");
        }
    } catch (error) {
        res.status(500).send("Error fetching activity.");
    }
});

// Create an activity
router.post("/", async (req, res) => {
    try {
        const newActivity = await ActivityService.createActivity(req.body);
        res.status(201).json(newActivity);
    } catch (error) {
        res.status(500).send("Error creating activity.");
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

module.exports = router;
