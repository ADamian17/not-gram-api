const db = require('../models');

const index = async ( req, res ) => {

  try {

    const posts = await db.Post.find({}).populate('user').sort({ createdAt: -1 })

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


const createPost = ( req, res ) => {
  const userId = req.session.currentUser.userId;

  db.Post.create( req.body, ( err, createdPost ) => {
    if ( err ) return console.log(err)

    db.User.findById( userId, ( err, foundUser ) => {

      createdPost.user = foundUser._id;
      createdPost.save();

      foundUser.posts.push(createdPost._id);
      foundUser.save();

      res.redirect('/');
    });
  });
}


module.exports = {
  index,
  createPost
}