const db = require('../models');

const index = ( req, res ) => {
  
  db.Post.find({})
  .populate('user')
  .sort({ createdAt: -1 })
  .exec( ( err, posts ) => {
    if ( err ) return console.log(err)

    console.log(req.session.currentUser)

    const context = {
      posts,
      currentUser: req.session.currentUser
    }

    res.render('feed/feed', context );
  })
}

// presentational
const addPostForm = ( req, res ) => {
  res.render('post/new');
}

const newPost = ( req, res ) => {
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

const testPosts = ( req, res ) => {
  db.Post.find({})
  .then( posts => res.send(posts) )
  .catch( err => console.log(err) );
}


module.exports = {
  index,
  addPostForm,
  newPost,
  testPosts
}