const jwt = require('jsonwebtoken');
const bcryptjs = require('bcrypt');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
require('dotenv').config({ path: './config.env' })
exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, role, password, passwordConfirm, gender, location } = req.body;

  if (!name || !email || !password || !gender || !role) {
    return next(new AppError('Please provide Valid details for signup', 400));
  }
  console.log("Before user created");
  let user = await User.create({
    name,
    email,
    role,
    password,
    passwordConfirm,
    gender,
    location
  });
  console.log("After user created!");
  res.json({
    status: true,
    data: user
  })
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  // fat models, thin controller
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // Dont want to expose the password
  user.password = undefined;

  if (user) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES
    })
    res.header('auth-token', token).json({
      status: true,
      data: user,
      token
    });
  } else {
    return res.json({ status: false })
  }
});