const express = require('express');
const router = express.Router();

const ctrls = require('../controllers');

// http://localhost:3005/api/v1/auth

router.get( '/signin', ctrls.user.loginForm );
router.post( '/login', ctrls.user.login );

// logout
router.delete( '/logout', ctrls.user.logout );

// show user
router.get( '/:userId', ctrls.user.show );

module.exports = router;