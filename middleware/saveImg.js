module.exports = ( req, res, next ) => {

  const imgTypes = [ 'image/jpeg', 'image/png', 'image/gif' ];
  const imgEncoded = req.body.img;

  if ( imgEncoded === null ) return res.status(500).json({
    status: 500,
    message: 'img is invalid',
  });

  const img = JSON.parse(imgEncoded)

  if ( img !== null && imgTypes.includes(img.type) ) {
    req.body.img = new Buffer.from( img.data, 'base64' );
    req.body.imgType = img.type;

    next();
  }
}; 