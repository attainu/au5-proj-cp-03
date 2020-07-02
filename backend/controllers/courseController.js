const RandExp = require("randexp");
const Course = require("../models/courseModel");
const User = require("../models/userModel");
const validateCourse = require("../validators/courseValidator");
const catchAsync = require("../utils/catchAsync");

exports.getcourses = async (req, res) => {
  res.json({ msg: "here you go" });
  //scan through the course 
  //filter out on the basis of course

};

exports.createcourse = catchAsync(async (req, res) => {
  const {
    courseID,
    name,
    description,
    startDate,
    endDate,
    lectureVideos,
    posts,
    assignments,
  } = req.body;
  const { errors, isValid } = validateCourse(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const course = await Course.create({
    courseID,
    name,
    description,
    instructor: req.user._id,
    startDate,
    endDate,
    lectureVideos,
    posts,
    assignments,
    enrollString: new RandExp(/^[0-9,A-Z]{20}$/).gen(),
  });
  const user = await User.findOne({ _id: req.user._id });
  user.instructorCourses.push(course._id);

  await User.findByIdAndUpdate(
    { _id: req.user._id },
    { instructorCourses: user.instructorCourses }
  );
  res.json({
    status: true,
    message: "Course created successfully",
    data: course,
  });
});

exports.getcourseid = async (coursename) => {
  const courseid = await Course.findOne({ courseID: coursename });
  return courseid._id;
};
