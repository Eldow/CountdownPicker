const express = require('express');
const router = express.Router();
const Group = require('../models/group');

router.route('/')
.get(function(req, res) {
  Group.find({}, function(err, groups) {
    if (err)
      res.send(err);
    res.json(groups);
  });
})
// Create a group
.post(function(req, res) {
  var group = new Group(req.body);
  group.save(function(err, createdGroup) {
    if (err)
      res.send(err);
    res.json({ message: 'Group created!', group: createdGroup });
  });
});

router.route('/:id')
// Get a group
.get(function(req, res) {
  Group.findById(req.params.id, function(err, group) {
    if (err)
      res.send(err);
    res.json(group);
  });
})
// Modify a group
.put(function(req, res) {
  Group.findById(req.params.id, function(err, group) {
    if (err)
      res.send(err);
    group.videos = req.body.videos;
    group.shared = req.body.shared;
    group.name = req.body.name;
    group.updated = Date.now();
    group.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Group updated' });
    });
  });
})
// Delete a group
.delete(function(req, res) {
  Group.findByIdAndRemove(req.params.id, function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'Group deleted' });
  });
});

module.exports = router;
