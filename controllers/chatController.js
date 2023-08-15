// const ChatRoom = require('../models/ChatRoom');
// const User = require('../models/User');

// // Get chat room messages
// exports.getChatRoomMessages = async (req, res) => {
//   try {
//     const chatRoomId = req.params.chatRoomId;
//     const chatRoom = await ChatRoom.findById(chatRoomId).populate('messages.sender', 'username');
//     if (!chatRoom) {
//       return res.status(404).json({ error: 'Chat room not found' });
//     }
//     return res.status(200).json({ messages: chatRoom.messages });
//   } catch (error) {
//     console.error('Error getting chat room messages:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// // Send a message in the chat room
// exports.sendMessage = async (req, res) => {
//   try {
//     const chatRoomId = req.params.chatRoomId;
//     const { userId, content } = req.body;

//     // Check if the user is a member of the chat room
//     const chatRoom = await ChatRoom.findById(chatRoomId);
//     if (!chatRoom || !chatRoom.members.includes(userId)) {
//       return res.status(403).json({ error: 'Unauthorized to send message in this chat room' });
//     }

//     const sender = await User.findById(userId, 'username');

//     // Add the message to the chat room
//     chatRoom.messages.push({ sender, content });
//     await chatRoom.save();

//     // Broadcast the message to other users in the chat room using Socket.io
//     // socket.emit('newMessage', { chatRoomId, message });
//     // ...

//     return res.status(201).json({ message: 'Message sent successfully' });
//   } catch (error) {
//     console.error('Error sending message:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// // Additional admin-only functionalities can be implemented here
// // For example, kicking users, showing user details, etc.
