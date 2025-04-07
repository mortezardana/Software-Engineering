const express = require('express');
const CommunityResource = require('../web/CommunityResource');

const router = express.Router();

// Community routes
router.use('/community', CommunityResource);

module.exports = router;
