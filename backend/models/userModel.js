const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
    trim: true
  },
  image: {
    type: String,
    default: 'default.jpg'
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    required: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  contactNumber: {
    type: Number
  },
  dob: {
    type: Date,
    default: new Date(2000, 01, 01)
  },
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  courses: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    default: []
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;