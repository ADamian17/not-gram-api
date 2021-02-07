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

    return res.json({
      status: 200,
      requestedAt: new Date().toLocaleString(),
    });
    
  } catch (error) {
    console.log( error )

    return res.status(500).json({
      status: 500,
      message: 'internal error',
    });  
  }
}

// update post

// delete post
const deletePost = async ( req, res ) => {

  try {
    const postId = req.params.postId;
    
    const deletedPost = await Post.findByIdAndDelete( postId );
    
    const foundUser = await User.findById( deletedPost.user );
    
    foundUser.posts.remove( deletedPost )
    foundUser.save();

    return res.json({
      status: 200,
      requestedAt: new Date().toLocaleString(),
    });

  } catch (error) {
    console.log( error )

    return res.status(500).json({
      status: 500,
      message: 'internal error',
    });  
  }

}

// like post


module.exports = {
  index,
  createPost,
  deletePost,
}