const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

// register
const register = async ( req, res ) => {

  try {
    let password = req.body.password;

    const foundUser = await User.findOne({ email: req.body.email });

    if ( foundUser )  return res.status(400).json({
      status: 400,
      message: 'Something went wrong. Please try again',
    });

    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync( password, salt );
    password = hash;

    req.body.password = password

    const createdUser = await User.create( req.body );

    return res.status(201).json({
      status: 201,
      message: 'User created',
      data: createdUser,
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

const login = async ( req, res ) => {

  try {
    const password = req.body.password

    const foundUser = await User.findOne({ email: req.body.email });
    
    if ( !foundUser ) throw 'invalidUser';

    const isMatch = await bcrypt.compare( password, foundUser.password );

    if ( isMatch ) {
      const signedJwt = await jwt.sign(
        {
          _id:foundUser._id,
        },
        process.env.SUPER_SECRET_KEY,
        {
          expiresIn: '10h',
        }
      )

      res.status(200).json({
        status: 200,
        message: 'Success',
        id: foundUser._id,
        signedJwt,
      });

    }

  } catch (error) {

    console.log( error );
    
    if ( error === 'invalidUser' ) {

      return res.status(400).json({
        status: 400,
        name: 'invalid user',
        message: `This user doesn't exist, Please try again.`
      });

  } else {

      return res.status(500).json({
        status: 500,
        message: 'server internal error'
      });

    }  
  }
}

const profile = async ( req, res ) => {

  try {

    const foundUser = await User.findById( req.user );

    return res.json({ headers: req.headers, user: foundUser });
    
  } catch (error) {

    return res.status(500).json({
      status: 500,
      message: 'server internal error',
    });
    
  };
};

module.exports = {
  register,
  login,
  profile,
}