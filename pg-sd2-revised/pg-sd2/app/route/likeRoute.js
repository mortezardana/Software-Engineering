const express = require('express');
const LikeResource = require('../web/LikeResource');

const router = express.Router();

// Like routes
router.use('/like', LikeResource);

module.exports = router;
