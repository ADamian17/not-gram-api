const express = require('express');
const router = express.Router();

const { auth } = require('../controllers');
const { authRequired } = require('../middleware');

/* register */
router.post( '/register', auth.register );

/* login */
router.post( '/login', auth.login );

/* profile */
router.get( '/profile', authRequired, auth.profile );

module.exports = router;