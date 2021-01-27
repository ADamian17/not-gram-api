const express = require('express');
const router = express.Router();

const ctrls = require('../controllers');


router.get( '/', ctrls.post.index );
router.get('/addpost', ctrls.post.addPost );
router.post('/newpost', ctrls.post.newPost );


module.exports = router;