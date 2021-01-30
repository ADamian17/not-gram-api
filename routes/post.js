const express = require('express');
const router = express.Router();

const ctrls = require('../controllers');


router.get( '/', ctrls.post.index );
router.get('/addpost', ctrls.post.addPostForm );
router.post('/newpost', ctrls.post.newPost );
router.get( '/test', ctrls.post.testPosts)


module.exports = router;
