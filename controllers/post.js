const db = require('../models');

const index = ( req, res ) => {
  console.log(req.session);

  db.Post.find({})
  .populate('user')
  .sort({ createdAt: -1 })
  .exec( ( err, posts ) => {
    if ( err ) return console.log(err)

    const context = {
      posts,
      currentUser: req.session.currentUser
    }

    res.render('feed/feed', context );
  })
}


const addPost = ( req, res ) => {
  res.render('post/new');
}

const newPost = ( req, res ) => {
  const userId = req.session.currentUser.userId;

  db.Post.create( req.body, ( err, createdPost ) => {
    if ( err ) return console.log(err)

    db.User.findById( userId, ( err, foundUser ) => {

      createdPost.user = foundUser._id;
      createdPost.save();

      console.log(createdPost)
      console.log('before', foundUser);
      foundUser.posts.push(createdPost._id);
      foundUser.save();
      console.log('after', foundUser);

      res.redirect('/');
    })

  })

}

module.exports = {
  index,
  addPost,
  newPost,
}