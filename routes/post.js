const express = require('express');
const router = express.Router();

const { post } = require('../controllers');
const { authRequired } = require('../middleware');

// all post 
router.get( '/', authRequired, post.index );

// new post
router.post( '/createpost', authRequired, post.createPost );

// show post
router.get( '/:postId', authRequired, post.showPost );

// update post

// like post
router.post( '/:postId/likepost', authRequired, post.likePost );

// delete post
router.delete( '/:postId/delete', authRequired, post.deletePost );


module.exports = router;
