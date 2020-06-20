const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

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
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide a confirm password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        console.log("validator");
        return el === this.password;
      },
      message: "Password and Confirm Password aren't the same!"
    }
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
  },
  location: {
    type: String,
    default: ""
  }
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  console.log("Middleware");
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;