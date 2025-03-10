const express = require('express');
const RewardResource = require('../web/RewardResource');

const router = express.Router();

// Reward routes
router.use('/reward', RewardResource);

module.exports = router;
