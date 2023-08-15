    const express = require('express');
    const passport = require('passport');
    const User = require('../models/User');
    const ChatRoom = require('../models/ChatRoom');
  

    const router = express.Router();

    // User registration
    router.post('/register', async (req, res) => {
      try {
        console.log('Received registration request:', req.body);

        const { username, mobile, email, password, isAdmin } = req.body;

        // Check if the username is already registered
        const existingUser = await User.findOne({ $or: [{ username }, {mobile}, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this username/mobile/email already exists' });
    }


        // Create and save the user
        const newUser = new User({ username, mobile, email, isAdmin });
        await User.register(newUser, password);

        const successMessage = isAdmin ? 'Admin registered successfully' : 'User registered successfully';

        return res.status(201).json({ message: successMessage });
      } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    });

    // User login
    router.post('/login', (req, res, next) => {

      
      passport.authenticate('local', (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({ error: 'Username or password is wrong' });
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.status(200).json({ message: 'Login successful', user });
        });
      })(req, res, next);
    });

    // router.post('/addmembers/:chatroomName', async (req, res) => {
    //   try {
    //     const { chatroomName } = req.params;
    //     const { usernames } = req.body;
    
    //     // Find the chatroom by its ID
    //     const chatroom = await ChatRoom.findById(chatroomName);
    
    //     if (!chatroom) {
    //       return res.status(404).json({ error: 'Chatroom not found' });
    //     }
    
    //     // Find the users with the provided usernames
    //     const members = await User.find({ username: { $in: usernames } });
    
    //     // Add the members to the chatroom
    //     chatroom.members.push(...members);
    //     await chatroom.save();
    
    //     return res.status(200).json({ message: 'Members added successfully' });
    //   } catch (error) {
    //     console.error('Error adding members:', error);
    //     return res.status(500).json({ error: 'Internal server error' });
    //   }
    // });

    
    // User logout
    router.get('/logout', (req, res) => {
      req.logout();
      return res.status(200).json({ message: 'Logout successful' });
    });

    
      
    module.exports = router;
