const express = require('express');
const CommentResource = require('../web/CommentResource');

const router = express.Router();

// Comment routes
router.use('/comment', CommentResource);

module.exports = router;
