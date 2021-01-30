const bcrypt = require('bcryptjs');

const db = require('../models');

// presentational
const register = (req, res) => {
  res.render('user/register');
}

const createUser = (req, res) => {
  console.log('before hash', req.body )
  db.User.findOne( { email: req.body.email }, ( err, foundUser ) => {
    
    if ( err ) return console.log(err);
    
    if ( foundUser ) return console.log('user exist');
    
    bcrypt.genSalt( 10, ( err, salt ) => {
      if ( err ) return console.log(err);
      
      bcrypt.hash( req.body.password, salt, ( err, hash ) => {
        if ( err ) return console.log(err);
        
        req.body.password = hash
        console.log('after hash', req.body )
        
        
        db.User.create( req.body, ( err, createdUser ) => {
          if ( err ) return console.log(err);

          console.log(createUser);
          res.redirect('/');
        })
      });
    })
  })
}

// presentational
const loginForm = ( req, res ) => {
  res.render('user/login')
};

const login = ( req, res ) => {
  if ( req.body.email === '' || 
  req.body.password === '' ) return res.render('user/login');
  
  db.User.findOne( { email: req.body.email }, ( err, foundUser ) => {
    if ( err ) return res.render('user/login')

    if ( !foundUser ) return res.render('user/login')

    bcrypt.compare( req.body.password, foundUser.password, ( err, isMatch ) => {
      if ( err ) return res.render('user/login')

      if ( !isMatch ) return res.render('user/login', {message: 'email or password are wrong '});

      req.session.currentUser = {
        username: foundUser.username,
        userImg: foundUser.avatarImg,
        userId: foundUser._id
      }

      res.redirect('/')

    })
  });
}

const show = ( req, res ) => {
  const _id = req.params.userId
  
  db.User.findById( _id )
    .populate('posts')
    .exec((err, foundProfile) => {
      if (err) return res.status(500).json({
        status: 500,
        data: foundProfile,
        error: [{ message: 'Something went wrong. Please try again '}],
      });

      return res.render( 'user/profile', {user: foundProfile} );
    });
};


// Logout 
const logout = (req, res) => {
  if (!req.session.currentUser) return res.status(401).json({ status: 401, message: 'Unauthorized'});

  req.session.destroy( (err) =>  {
    if (err) return res.redirect('/users/signup');

    res.redirect('/users/signup');
  });
};


module.exports = {
  register,
  createUser,
  loginForm,
  login,
  logout,
  show,
}