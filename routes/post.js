const express = require('express');
const router = express.Router();

const { post } = require('../controllers');
const { authRequired } = require('../middleware');

// all post 
router.get( '/', authRequired, post.index );
// show post

// new post
router.post( '/createpost', authRequired, post.createPost );

// update post

// delete post
router.delete( '/:postId/delete', authRequired, post.deletePost );

// like post

module.exports = router;
