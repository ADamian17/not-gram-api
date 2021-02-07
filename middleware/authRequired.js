// jwt middle ware for verification
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  try {

      if ( typeof bearerHeader === 'undefined' ) throw 'forbidden';

      const token = bearerHeader.split(' ')[1];
      let payload = jwt.verify( token, process.env.SUPER_SECRET_KEY );
      req.user = payload ? payload._id : null; // set user id for routes to use

      next();
      
  } catch (error) {
      if ( error === 'forbidden' ) {

          res.sendStatus(403).json({
              status: 403,
              message: 'forbidden'
          });
      } else  {

          res.status(401).json({
              status: 401,
              ...error
          });
      }
  }

};