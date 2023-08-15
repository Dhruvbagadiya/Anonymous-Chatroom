const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');
const ChatRoom = require('../models/ChatRoom');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin
    });

    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// User login
exports.loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: 'Login successful', user });

    });
  })(req, res, next);
};

// User logout
exports.logoutUser = (req, res) => {
  req.logout();
  return res.status(200).json({ message: 'Logout successful' });
};

// Create a new chatroom
exports.createChatroom = async (req, res) => {
  try {
    const { chatroomName } = req.body;

    // Check if a chatroom with the same name already exists
    const existingChatroom = await ChatRoom.findOne({ chatroomName });
    if (existingChatroom) {
      return res.status(400).json({ error: 'Chatroom with this name already exists' });
    }

    // Create and save the new chatroom
    const newChatroom = new ChatRoom({ chatroomName });
    await newChatroom.save();

    return res.status(201).json({ message: 'Chatroom created successfully' });
  } catch (error) {
    console.error('Error creating chatroom:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
