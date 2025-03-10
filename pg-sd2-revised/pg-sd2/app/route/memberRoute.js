const express = require('express');
const MemberResource = require('../web/MemberResource');

const router = express.Router();

// Member routes
router.use('/member', MemberResource);

module.exports = router;
