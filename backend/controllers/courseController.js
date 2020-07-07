/* eslint-disable prettier/prettier */
const RandExp = require("randexp");
const Course = require("../models/courseModel");
const User = require("../models/userModel");
const validateCourse = require("../validators/courseValidator");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getcourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById({ _id: id }).populate({
    path: "posts quizzes"
  });
  res.json({
    status: true,
    message: `Course info has been retrieved successfully`,
    data: course,
  });
});

exports.createcourse = catchAsync(async (req, res, next) => {
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
  console.log(req.body);
  const { errors, isValid } = validateCourse(req.body);
  console.log(errors);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  if (
    req.startDate &&
    new Date(req.body.startDate).getTime() >
    new Date(req.body.endDate).getTime()
  ) {
    return next(
      new AppError(
        "Start date of a course can't be after the end date of the course",
        400
      )
    );
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

exports.updateCourse = catchAsync(async (req, res, next) => {
  const { id } = req.body;

  const restrictedFields = Object.keys(req.body).some(
    (el) =>
      el === "posts" ||
      el === "quizzes" ||
      el === "studentsEnrolled" ||
      el === "assignments"
  );

  if (restrictedFields) {
    return next(
      new AppError("You can't update certain fields using this", 403)
    );
  }

  let course = await Course.findById({ _id: id }).populate({
    path: "instructor",
    select: "email",
  });
  if (req.body.lectureVideos) {
    if (course.instructor.email !== req.user.email) {
      return next(
        new AppError("You don't have permission to access this action", 403)
      );
    }

    course.lectureVideos.push([
      ...course.lectureVideos,
      req.body.lectureVideos,
    ]);
    req.body.lectureVideos = course.lectureVideos;
  }

  if (
    req.startDate &&
    new Date(req.body.startDate).getTime() > new Date(course.endDate).getTime()
  ) {
    return next(
      new AppError(
        "Start date of a course can't be after the end date of the course",
        400
      )
    );
  }

  if (
    req.body.endDate &&
    new Date(req.body.endDate).getTime() < new Date(course.startDate).getTime()
  ) {
    return next(
      new AppError(
        "End date of a course can't be before the start date of the course",
        400
      )
    );
  }

  course = await Course.findOneAndUpdate({ _id: id }, req.body, { new: true });

  res.json({
    status: true,
    message: `Course has been updated sucessfully`,
    data: course,
  });
});
