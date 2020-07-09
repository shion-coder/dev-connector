const express = require('express');
const passport = require('passport');

const Post = require('../../models/post');
const Profile = require('../../models/profile');
const validatePostInput = require('../../validation/post');

/* -------------------------------------------------------------------------- */

const router = express.Router();

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', async (req, res) => {
  const posts = await Post.find()
    .sort({ date: -1 })
    .catch(() => {
      return res.status(404).json({ msg: 'Error in find all post' });
    });

  if (!posts) {
    return res.status(404).json({ noPostsFound: 'No posts found' });
  }

  res.json(posts);
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', async (req, res) => {
  const errors = {};

  const post = await Post.findById(req.params.id).catch(() => {
    return res.status(404).json({ msg: 'Error in find user profile by handle' });
  });

  if (!post) {
    errors.noProfile = 'No post found with that id';

    return res.status(404).json(errors);
  }

  res.json(post);
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { isValid, errors } = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { id } = req.user;
  const { text, name, avatar } = req.body;

  const newPost = await new Post({
    user: id,
    text,
    name,
    avatar,
  })
    .save()
    .catch(() => {
      return res.status(404).json({ msg: 'Error in save new post' });
    });

  res.json(newPost);
});

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id }).catch(() => {
    return res.status(404).json({ msg: 'Error when find profile by id' });
  });

  if (!profile) {
    return res.status(404).json({ noProfile: 'No Profile found' });
  }

  const post = await Post.findById(req.params.id).catch(() => {
    return res.status(404).json({ msg: 'Error in find post by id' });
  });

  if (!post) {
    return res.status(404).json({ noPostFound: 'No post found with that id' });
  }

  // Check for post owner
  if (!post.user.toString() === req.user.id) {
    return res.status(404).json({ noAuthorized: 'User not authorized' });
  }

  // Delete
  await post.remove().catch(() => {
    return res.status(404).json({ msg: 'Error when remove post' });
  });

  res.json({ success: true });
});

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id }).catch(() => {
    return res.status(404).json({ msg: 'Error when find profile by id' });
  });

  if (!profile) {
    return res.status(404).json({ noProfile: 'No Profile found' });
  }

  const post = await Post.findById(req.params.id).catch(() => {
    return res.status(404).json({ msg: 'Error in find post by id' });
  });

  if (!post) {
    return res.status(404).json({ noPostFound: 'No post found with that id' });
  }

  const { id } = req.user;

  // Check for like exist
  if (post.likes.filter((like) => like.user.toString() === id).length > 0) {
    return res.status(400).json({ alreadyLiked: 'User already liked this post' });
  }

  // Add user id  to likes array
  post.likes.unshift({ user: id });

  const newPost = await post.save().catch(() => {
    return res.status(404).json({ msg: 'Error in save post' });
  });
  res.json(newPost);
});

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id }).catch(() => {
    return res.status(404).json({ msg: 'Error when find profile by id' });
  });

  if (!profile) {
    return res.status(404).json({ noProfile: 'No Profile found' });
  }

  const post = await Post.findById(req.params.id).catch(() => {
    return res.status(404).json({ msg: 'Error in find post by id' });
  });

  if (!post) {
    return res.status(404).json({ noPostFound: 'No post found with that id' });
  }

  const { id } = req.user;

  // Check for like exist
  if (post.likes.filter((like) => like.user.toString() === id).length === 0) {
    return res.status(400).json({ notLiked: 'You have not yet liked this post' });
  }

  // Get remove index
  const removeIndex = post.likes.map((like) => like.user.toString()).indexOf(id);

  // Splice out of array
  post.likes.splice(removeIndex, 1);

  const newPost = await post.save().catch(() => {
    return res.status(404).json({ msg: 'Error in save post' });
  });
  res.json(newPost);
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { isValid, errors } = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const post = await Post.findById(req.params.id).catch(() => {
    return res.status(404).json({ msg: 'Error in find post by id' });
  });

  if (!post) {
    return res.status(404).json({ noPostFound: 'No post found with that id' });
  }

  const { id } = req.user;
  const { text, name, avatar, user } = req.body;

  const newComment = { text, name, avatar, user };

  // Add to comments array
  post.comments.unshift(newComment);

  const newPost = await post.save().catch(() => {
    return res.status(404).json({ msg: 'Error in save post' });
  });
  res.json(newPost);
});

// @route   DELETE api/posts/comment/:id/:commentId
// @desc    DELETE comment from post
// @access  Private
router.delete('/comment/:id/:commentId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const post = await Post.findById(req.params.id).catch(() => {
    return res.status(404).json({ msg: 'Error in find post by id' });
  });

  if (!post) {
    return res.status(404).json({ noPostFound: 'No post found with that id' });
  }

  if (post.comments.filter((comment) => comment._id.toString() === req.params.commentId).length === 0) {
    return res.status(404).json({ commentNotExist: 'Comment does not exist' });
  }

  // Get remove index
  const removeIndex = post.comments.map((comment) => comment._id.toString()).indexOf(req.params.commentId);

  // Splice comment out of array
  post.comments.splice(removeIndex, 1);

  const newPost = await post.save().catch(() => {
    return res.status(404).json({ msg: 'Error in save post' });
  });
  res.json(newPost);
});

/* -------------------------------------------------------------------------- */

module.exports = router;
