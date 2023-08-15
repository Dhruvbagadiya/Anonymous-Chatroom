const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const ChatRoom = require('./ChatRoom');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  mobile: {type: Number, required: true, unique: true, },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  isAdmin: { type: Boolean, default: false },
});

// Add username and password hashing to the schema
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;
