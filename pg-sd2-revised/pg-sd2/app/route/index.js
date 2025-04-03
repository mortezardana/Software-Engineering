const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Dynamically import all route files
fs.readdirSync(__dirname).forEach((file) => {
    if (file !== "index.js" && file.endsWith("Route.js")) {
        const route = require(path.join(__dirname, file));

        // 🔍 Debugging output
        console.log(`Loading route: ${file}`);

        if (!route || typeof route !== "function" && typeof route !== "object") {
            console.error(`❌ ERROR: ${file} is not exporting a valid Express router.`);
            return;
        }

        router.use(`/${file.replace("Route.js", "").toLowerCase()}`, route);
    }
});

module.exports = router;
