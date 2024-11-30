// Create web server
// Create a new comment
// Get all comments
// Get a comment by id
// Update a comment by id
// Delete a comment by id

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Create a new comment
router.post('/comments', async (req, res) => {
  const comment = new Comment({
    comment: req.body.comment,
    name: req.body.name,
    date: req.body.date,
    email: req.body.email,
    photo: req.body.photo,
  });
  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all comments
router.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a comment by id
router.get('/comments/:id', getComment, (req, res) => {
  res.json(res.comment);
});

// Update a comment by id
router.patch('/comments/:id', getComment, async (req, res) => {
  if (req.body.comment != null) {
    res.comment.comment = req.body.comment;
  }
  if (req.body.name != null) {
    res.comment.name = req.body.name;
  }
  if (req.body.date != null) {
    res.comment.date = req.body.date;
  }
  if (req.body.email != null) {
    res.comment.email = req.body.email;
  }
  if (req.body.photo != null) {
    res.comment.photo = req.body.photo;
  }
  try {
    const updatedComment = await res.comment.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a comment by id
router.delete('/comments/:id', getComment, async (req, res) => {
  try {
    await res.comment.remove();
    res.json({ message: 'Comment deleted!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a comment by id