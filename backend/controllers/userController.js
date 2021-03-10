const asyncHandler = require('express-async-handler');
const { generateToken, getTokenExpiryDate } = require('../utils/token');
const User = require('../models/User');

const validateRegistration = (username, email, password, confirm_password) => {
  if (!username || !email || !password || !confirm_password) {
    return 'Missing registration info';
  }
  if (username.length < 2) {
    return 'Username has to have at least 2 characters';
  } else if (username.length > 70) {
    return 'Username has to no more than 70 characters';
  } else if (/\s/.test(username)) {
    return 'Username can not contain spaces';
  }

  const emailPatten = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i;
  if (!emailPatten.test(email)) {
    return 'Please provide a valid email address';
  }

  if (password.length < 6) {
    return 'Password has to have at least 6 characters';
  }

  if (password !== confirm_password) {
    return 'Confirm Password must match to Password';
  }

  return true;
};

// @desc    add a new User
// @route   POST /api/users/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, confirm_password } = req.body;
  const isValid = validateRegistration(
    username,
    email,
    password,
    confirm_password
  );
  if (isValid !== true) {
    res.status(400);
    throw new Error(isValid);
  }
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      const token = generateToken(user._id);
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token,
        tokenExpiry: getTokenExpiryDate(token)
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(400);
      throw new Error('Username already exists');
    } else {
      res.status(500);
      throw new Error('Internal Server Error');
    }
  }
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error('No such user');
  }

  const isPasswordCorrect = await user.matchPassword(password);
  if (!isPasswordCorrect) {
    res.status(400);
    throw new Error('Email/Password mismatch');
  }

  const token = generateToken(user._id);
  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
    token: token,
    tokenExpiry: getTokenExpiryDate(token)
  });
});

module.exports = {
  registerUser,
  login,
};
