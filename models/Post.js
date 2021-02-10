const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  img: {
    type: Buffer,
    required: true
  },
  imgType: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  likes: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }]
},
{
  timestamps: true
});

postSchema.virtual('imgPath').get( function () {
  if ( this.img !== null && this.imgType !== null ) {
    return `data:${this.imgType};charset=utf-8;base64,${this.img.toString('base64')} `;
  }
});

const Post = mongoose.model('Post', postSchema )

module.exports = Post;
