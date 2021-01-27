/* EXTERNALMODULES*/
const express = require ('express');
const methodOverride = require('method-override');

const PORT = 3500;

const app = express()


/* APP CONFIG */
app.set( 'view engine', 'ejs' );



app.get( '/',  ( req, res ) => {

  res.send('hello world');
}) ;


app.listen( PORT, () => console.log( `listing at port ${PORT} \nhttp://localhost:${PORT}`) );
