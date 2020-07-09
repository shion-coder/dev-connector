const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/user');
const { secretOrKey } = require('../../config/keys');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

/* -------------------------------------------------------------------------- */

const router = express.Router();

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  const { isValid, errors } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { name, email, password } = req.body;

  // Find user by email
  const existingEmail = await User.findOne({ email }).catch(() => {
    return res.status(404).json({ msg: 'Error in check email when register' });
  });

  // Check for user email
  if (existingEmail) {
    errors.email = 'Email already exists';

    return res.status(400).json(errors);
  }

  const avatar = gravatar.url(email, {
    s: '200', // Size,
    r: 'pg', // Rating
    d: 'mm', // Default
  });

  const newUser = new User({
    name,
    email,
    password,
    avatar,
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      if (err) {
        throw err;
      }

      newUser.password = hash;

      const user = await newUser.save().catch(() => {
        return res.status(404).json({ msg: 'Error in save new user' });
      });

      res.json(user);
    });
  });
});

// @route   POST api/users/login
// @desc    Login user / Returning JWT Token
// @access  Public
router.post('/login', async (req, res) => {
  const { isValid, errors } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email }).catch(() => {
    return res.status(404).json({ msg: 'Error in check email when log in' });
  });

  // Check for user email
  if (!user) {
    errors.email = 'User not found';

    return res.status(404).json(errors);
  }

  // Check for user password
  const isMatch = await bcrypt.compare(password, user.password).catch(() => {
    return res.status(404).json({ msg: 'Error in compare user password bcrypt' });
  });

  if (!isMatch) {
    errors.password = 'Password incorrect';

    return res.status(400).json(errors);
  }

  const payload = { id: user.id, name: user.name, avatar: user.avatar };

  jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
    res.json({
      success: true,
      token: 'Bearer ' + token,
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id, name, email } = req.user;

  res.json({ id, name, email });
});

/* -------------------------------------------------------------------------- */

module.exports = router;
