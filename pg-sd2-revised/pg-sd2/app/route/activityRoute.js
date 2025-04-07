const express = require('express');
const ActivityResource = require('../web/ActivityResource');

const router = express.Router();

// Activity routes
router.use('/activity', ActivityResource);

module.exports = router;
