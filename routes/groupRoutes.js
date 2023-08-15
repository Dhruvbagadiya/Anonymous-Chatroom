  const express = require('express');
  const router = express.Router();

  function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, proceed to the next middleware/route handler
    }
    // User is not authenticated, redirect to login page or send an error response
    res.redirect('/'); // Redirect to the login page
  }

  // Route to render the group.ejs page
  router.get('/:chatroomName', isAuthenticated, (req, res) => {
    if (req.user && req.user.isAdmin) {
      const { chatroomName } = req.params;
      // Assuming you have a group.ejs file in the views folder
      res.render('group', { chatroomName });
    } else {
      res.redirect('/'); // Redirect unauthorized users to the login page
    }
  });

  module.exports = router;
