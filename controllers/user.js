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


module.exports = {
  register,
  createUser,
  loginForm,
  login
}