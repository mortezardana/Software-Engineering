const express = require('express');
const PostResource = require('../web/PostResource');

const router = express.Router();

// Post routes
router.use('/post', PostResource);

module.exports = router;
