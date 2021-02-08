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

const showPost = async ( req, res ) => {

  try {
    const postId = req.params.postId;

    const foundPost = await Post.findById( postId ).populate('user');

    return res.json({
      status: 200,
      data: foundPost,
      requestedAt: new Date().toLocaleString(),
    });
    
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'internal error',
      error
    });
  }
}


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

const updatePost = async ( req, res ) => {
  try {
    const postId = req.params.postId;
    
    const updatedPost = await Post.findByIdAndUpdate( 
      postId,
      {
        $set: {
          ...req.body,
        },
      },  
      { 
        new: true 
      });

    return res.status(200).json({
      status: 200,
      data: updatedPost,
      message: 'success',
    });
    
  } catch (error) {
    console.log( error )

    return res.status(500).json({
      status: 500,
      message: 'internal error',
    });  
  }
} 

// delete post
const deletePost = async ( req, res ) => {

  try {
    const postId = req.params.postId;
    
    const deletedPost = await Post.findByIdAndDelete( postId );
    
    const foundUser = await User.findById( deletedPost.user );
    
    foundUser.posts.remove( deletedPost )
    foundUser.save();

    return res.status(204).json({
      status: 204,
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

const likePost = async ( req, res ) => {
  try {
    const postId = req.params.postId;

    const foundPost = await Post.findById( postId );
    
    if ( !foundPost.likes.includes( req.user ) ) {
      
      foundPost.likes.push( req.user );
      foundPost.save();

      return res.json({
        status: 200,
        message: '1',
        requestedAt: new Date().toLocaleString(),
      });
    }

    return res.json({
      status: 200,
      message: '-1',
      requestedAt: new Date().toLocaleString(),
    });

  } catch (error) {
    console.log( error )

    return res.status(500).json({
      status: 500,
      message: 'internal error',
    });
  };
};


module.exports = {
  index,
  showPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
}