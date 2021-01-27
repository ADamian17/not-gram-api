const express = require('express');
const router = express.Router();

const ctrls = require('../controllers');

// http://localhost:3500/users

router.get( '/register', ctrls.user.register );
router.post( '/createuser', ctrls.user.createUser );

router.get( '/signup', ctrls.user.loginForm );
router.post( '/login', ctrls.user.login );

// router.get( '/login', (req, res) => {
//   res.send('i"m taco')
// })

// router.get( '/logout', (req, res) => {
//   res.send('i"m taco')
// })

module.exports = router;