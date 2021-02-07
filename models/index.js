const mongoose = require('mongoose');

require('dotenv').config()
const connectionStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/not-instagram-api';

mongoose.connect( connectionStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then( () => console.log('MongoDB connected :)'))
.catch( (err) => console.log('MongoDB error', err))


mongoose.connection.on( 'disconnected', (err) => console.log(err) );

module.exports = {
  User: require('./User'),
  Post: require('./Post'),
}
