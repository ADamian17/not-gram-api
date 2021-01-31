const express = require('express');
const router = express.Router();

const ctrls = require('../controllers');

// http://localhost:3500/users

router.get( '/register', ctrls.user.register );
router.post( '/createuser', ctrls.user.createUser );

router.get( '/signin', ctrls.user.loginForm );
router.post( '/login', ctrls.user.login );

// logout
router.delete( '/logout', ctrls.user.logout );

// show user
router.get( '/:userId', ctrls.user.show );

module.exports = router;