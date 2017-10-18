const express = require('express');
const router = express.Router();
const Group = require('../models/group');

router.route('/')
.get(function(req, res) {
  Group.find({'owner.userId': req.query.owner}, null, { sort: {createdAt: -1 }}, function(err, groups) {
    if (err)
      res.send(err);
    res.json(groups);
  });
})
// Create a group
.post(function(req, res) {
  const group = new Group({ name: req.body.name, owner: req.body.owner });
  group.createdAt = new Date();
  group.save(function(err, createdGroup) {
    if (err)
      res.send(err);
    res.json(createdGroup);
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
    group.name = req.body.name;
    group.people = req.body.people;
    group.save(function(err) {
      if (err)
        res.send(err);
      res.json(group);
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
