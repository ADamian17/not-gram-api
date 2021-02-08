/* EXTERNAL MODULES */
const express = require ('express');
const cors = require('cors');

/* INTERNAL MODULES */
const { user, post, auth } = require('./routes');
const { logger } = require('./middleware');

/* PORT */
require('dotenv').config()
const PORT = process.env.PORT || 3005;

const app = express()

/* Middleware */
app.use( express.static('public'));

/* cross origin config */
app.use( cors() );

/* for parsing application/x-www-form-urlencoded */
app.use( express.urlencoded({ extended: true }))
app.use( express.json() );

// logger
app.use( logger );

/* routes */
// post routes
app.get( '/', ( req, res ) => {
  res.send('<h1 style="text-align: center;">Not Instagram</h1>')
}) ;

// auth routes
app.use( '/api/v1/auth', auth );

// users routes 
// app.use('/api/v1/users', user );

// post routes 
app.use('/api/v1/posts', post );

// app listing
app.listen( PORT, () => console.log( `listing at port ${PORT} \nhttp://localhost:${PORT}`) );
