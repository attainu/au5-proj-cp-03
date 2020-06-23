const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

require("dotenv").config({ path: "./config.env" });

exports.signup = catchAsync(async (req, res, next) => {
  const {
    name,
    email,
    role,
    password,
    passwordConfirm,
    gender,
    location,
  } = req.body;

  if (!name || !email || !password || !gender || !role) {
    return next(new AppError("Please provide Valid details for signup", 400));
  }

  const user = await User.create({
    name,
    email,
    role,
    password,
    passwordConfirm,
    gender,
    location,
  });

  res.json({
    status: true,
    data: user,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return next(
      new AppError("Please provide a valid email and password!", 400)
    );
  }
  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  // fat models, thin controller
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // Dont want to expose the password
  user.password = undefined;

  if (user) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
    res.header("auth-token", token).json({
      status: true,
      data: user,
      token,
    });
  } else {
    return res.json({ status: false });
  }
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  const user = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(user._id);

  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  if (currentUser.changedPasswordAfter(user.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  req.user = currentUser;

  next();
});

exports.restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You don't have permission to perform this action", 403)
      );
    }

    next();
  };
};
