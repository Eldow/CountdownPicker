const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.route('/')
// Create a user
.post(function(req, res) {
  const newUser = new User(req.body);
  User.find({userId : req.body.userId}, function(err, users) {
    if (users.length > 0) {
      res.send(err);
    } else {
      newUser.save(function(err) {
        res.json({ message: 'User created!' });
      });
    }
  })

});

module.exports = router;
