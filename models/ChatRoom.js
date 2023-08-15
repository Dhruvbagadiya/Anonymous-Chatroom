  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  const User = require('./User'); 

  const chatRoomSchema = new Schema({
    chatroomName: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [
      {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  });

  const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

  module.exports = ChatRoom;
