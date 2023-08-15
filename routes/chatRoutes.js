const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ChatRoom = require('../models/ChatRoom');
  
router.post('/chatroom', async (req, res) => {
  try {
    const { chatroomName, members } = req.body;

    const user = await User.findOne({ username: req.user.username });
    if (!user.isAdmin) {
      return res.status(403).json({ error: 'Only admin users can create chatrooms' });
    }

    // Check if a chatroom with the same name already exists  
    const existingChatroom = await ChatRoom.findOne({ chatroomName  });
    if (existingChatroom) {
      return res.status(400).json({ error: 'Chatroom with this name already exists' });
    }

    const membersArray = members.split(',').map(member => member.trim());

    const memberIds = await User.find({ username: { $in: membersArray } }).distinct('_id');

    // Create and save the new chatroom
    const newChatroom = new ChatRoom({ chatroomName, members: memberIds });
    await newChatroom.save();

    return res.status(201).json({ message: 'Chatroom created successfully' });
  } catch (error) {
    console.error('Error creating chatroom:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});





router.post('/join', async (req, res) => {
  try {
    const { chatroomName, username } = req.body;

    // Check if a chatroom with the given name exists
    const existingChatroom = await ChatRoom.findOne({ chatroomName });
    if (!existingChatroom) {
      return res.status(404).json({ error: 'Chatroom not found' });
    }

    // Find the user based on their username
    const user = await User.findOne({ username:req.user.username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user is already a member of the chatroom
    if (existingChatroom.members.includes(user._id)) {
      return res.status(202).json({ message: 'You are already a member of this chatroom,Welcome' });
    }

    // Add the user to the chatroom
    existingChatroom.members.push(user._id);
    await existingChatroom.save();

    return res.status(200).json({ message: 'Successfully joined the chatroom' });
  } catch (error) {
    console.error('Error joining chatroom:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;  