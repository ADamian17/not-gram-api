const express = require('express');
const router = express.Router();

const { auth } = require('../controllers');

/* register */
router.post( '/register', auth.register );

/* login */
router.post( '/login', auth.login );

/* profile */
router.get( '/profile', auth.profile );

module.exports = router;