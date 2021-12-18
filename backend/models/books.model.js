const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id:{
    type:Number,
    required:true
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1
  },
  author: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  isbn: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
}, {
  timestamps: true,
});

const User = mongoose.model('Books', userSchema);

module.exports = User;