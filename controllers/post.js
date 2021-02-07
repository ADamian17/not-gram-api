const { User, Post } = require('../models');

const index = async ( req, res ) => {

  try {

    const posts = await Post.find({}).populate('user').sort({ createdAt: -1 })

    return res.json({
      status: 200,
      data: posts,
      requestedAt: new Date().toLocaleString(),
    });
    
  } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'internal error',
        error
      });
  };
};


const createPost = async ( req, res ) => {
  
  try {
    req.body.user = req.user
    
    const createdPost = await Post.create( req.body );
    
    const foundUser = await User.findById( createdPost.user );
    
    foundUser.posts.push(createdPost._id);
    foundUser.save();

    console.log( foundUser )

    return res.json({
      status: 200,
      requestedAt: new Date().toLocaleString(),
    });
    
  } catch (error) {

    console.log( error )

    return res.status(500).json({
      status: 500,
      message: 'internal error',
      error
    });  
  }
}

// new post
// router.post('/createpost', authRequired, post.createPost );

// update post

// delete post

// like post


module.exports = {
  index,
  createPost
}