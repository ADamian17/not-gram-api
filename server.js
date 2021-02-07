/* EXTERNAL MODULES */
const express = require ('express');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

/* INTERNAL MODULES */
const routes = require('./routes')

/* PORT */
require('dotenv').config()
const PORT = process.env.PORT || 3005;

const app = express()


/* APP CONFIG */
app.set( 'view engine', 'ejs' );

/* Middleware */
app.use( express.static('public'));

/* for parsing application/x-www-form-urlencoded */
app.use( express.urlencoded({ extended: true }))
app.use( express.json() );

app.use( methodOverride('_method'));

// for our session 
app.use( session({
  store: new MongoStore({ url: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/not-instagram'}),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 24 * 7 * 2 // two weeks 
    }
  }) 
);

app.use( ( req, res, next ) => {
  console.log(`${req.method} ${req.originalUrl}`)
  next();
})

// user it create a global varieble for our app
app.use( ( req, res, next)  => {
  app.locals.currentUser =  req.session.currentUser;
  next();
});

/* routes */
// post routes
app.use( '/', routes.post ) ;

// users routes 
app.use('/users', routes.user );

// app listing
app.listen( PORT, () => console.log( `listing at port ${PORT} \nhttp://localhost:${PORT}`) );
