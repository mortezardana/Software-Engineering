const express = require('express');
const MemberResource = require('../web/memberResource');

const router = express.Router();

// Member routes
router.use('/member', MemberResource);

module.exports = router;
