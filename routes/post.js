const express = require('express');
const router = express.Router();

const { post } = require('../controllers');
const { authRequired } = require('../middleware');

// all post 
router.get( '/', authRequired, post.index );

// new post
// router.post('/createpost', authRequired, post.createPost );

module.exports = router;
