const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseID: {
    type: String,
    unique: true,
    required: ["true", "Provide a valid course ID"],
  },
  name: {
    type: String,
    required: ["true", "Please provide a name for course"],
  },
  description: {
    type: String,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  startDate: Date,
  endDate: Date,
  lectureVideos: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    default: [],
  },
  posts: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    default: [],
  },
  assignments: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],
    default: [],
  },
  quizzes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],
    default: [],
  },
  studentsEnrolled: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  enrollString: {
    type: String,
    required: true,
    unique: true,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
