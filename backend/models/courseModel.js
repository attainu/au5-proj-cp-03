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
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
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
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
    default: [],
  },
  ebooks: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ebook" }],
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

// courseSchema.pre("findOneAndUpdate", async function (next) {
//   console.log("Enterd middleware");
//   if (new Date(this.startDate).getTime() > new Date(this.endDate).getTime()) {
//     return next(
//       new AppError(
//         "Start date of a course can't be after the end date of the course",
//         400
//       )
//     );
//   }

//   if (new Date(this.endDate).getTime() < new Date(this.startDate).getTime()) {
//     return next(
//       new AppError(
//         "End date of a course can't be before the start date of the course",
//         400
//       )
//     );
//   }
// });

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
