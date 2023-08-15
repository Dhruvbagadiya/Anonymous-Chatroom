    const express = require('express');
    const socketio = require('socket.io');
    const mongoose = require('mongoose');
    const bcrypt = require('bcrypt');
    const passport = require('passport');
    const session = require('express-session');
    const User = require('./models/User');
    const app = express();
    const server = require('http').createServer(app);
    const io = socketio(server);
    const passportLocalMongoose = require('passport-local-mongoose');
    const path = require('path');
    const bodyParser = require('body-parser');
    const ChatRoom = require('./models/ChatRoom');

    const port = process.env.PORT || 3000;

    console.log("Socket connection established:", socketio.connected);

    // Connect to the database (e.g., MongoDB)
    mongoose.connect('mongodb://localhost/group-chat-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    function isAuthenticated(req, res, next) {
      if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware/route handler
      }
      // User is not authenticated, redirect to login page or send an error response
      res.redirect('/'); // Redirect to the login page
    }

   
    // Middlewares
    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(
      session({
        secret: 'cf51399fb8c2aad2108c698b12d61b4e4c1c02fdfdd225b8c601654acf343bf7',
        resave: false,
        saveUninitialized: false,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    // Passport configuration
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    // Routes
    const authRoutes = require('./routes/authRoutes');
    const chatRoutes = require('./routes/chatRoutes');
    const groupRoutes = require('./routes/groupRoutes');


    app.use('/auth', authRoutes);
    app.use('/chat', chatRoutes);
    app.use('/group', groupRoutes);

    // Serve static filesavengers92
    app.use(express.static('public'));

    
    app.get('/chatroom',isAuthenticated,(req,res)=>{
      res.render('chatroom.ejs');
    })

    

    // Socket.io setup
io.on('connection', (socket) => {
  console.log('New user connected');

  // Handle 'joinChatroom' event from the client
  socket.on('joinChatroom', (chatroomName) => {
    socket.join(chatroomName); // Add the user to the specific chatroom room
  });

  // Listen for 'chatMessage' events from the client
  socket.on('message', (data) => {
  console.log('Message received:', data);
  io.emit('message', data);
});


  // Listen for 'joinRoom' event from the client
  // socket.on('joinRoom', (chatroomName) => {
  //   // Store the chatroomName in the socket object
  //   socket.chatroomName = chatroomName;
  //   // Join the chatroomName room
  //   socket.join(chatroomName);
  // });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});



    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    // Start the server
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });


    module.exports = io;