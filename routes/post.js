const express = require('express');
const router = express.Router();

const ctrls = require('../controllers');
const authRequired = require('../middleware/authRequired');


router.get( '/', authRequired, ctrls.post.index );
router.get('/addpost', authRequired, ctrls.post.addPostForm );
router.post('/newpost', ctrls.post.newPost );


module.exports = router;
