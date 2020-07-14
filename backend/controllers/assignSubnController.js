const AssignSubn = require("../models/assignSubnModel");
const Assignment = require("../models/assignmentModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Course = require("../models/courseModel");
const User = require("../models/userModel");

exports.getAssignment = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError(`Invalid course ID`, 400));
  }

  const course = await Course.findById({ _id: id }).populate({
    path: "assignments",
    populate: {
      path: "submissions",
      populate: {
        path: "userID",
        select: "name",
      },
    },
  });
  // Get all submissions

  const user = await User.findById({ _id: req.user._id }).populate({
    path: "studentCourses.assignSubn",
    select: "studentCourses",
    populate: {
      path: "assignmentID",
      populate: "submissions",
    },
  });

  const index = user.studentCourses.findIndex((el) => {
    return `${el.courseID[0]}` === `${id}`;
  });
  for (let i = 0; i < user.studentCourses[index].assignSubn.length; i += 1) {
    for (let j = 0; j < course.assignments.length; j += 1) {
      const indexes = course.assignments[j].submissions
        .map((el) => el._id)
        .indexOf(user.studentCourses[index].assignSubn[i]._id);
      if (indexes !== -1) {
        course.assignments[
          j
        ].title += `{Submitted{${course.assignments[j].submissions[indexes].file}`;
      }
    }
  }

  res.json({
    data: course.assignments,
  });
});

exports.assingmentSubn = catchAsync(async (req, res, next) => {
  const { assignmentID, file } = req.body;

  if (!assignmentID)
    return next(new AppError("Provide a valid user ID and assignment ID", 400));

  const assignment = await Assignment.findOne({ _id: assignmentID });

  if (!assignment) return next(new AppError(`No assignment with this ID`, 400));
  const assignCourse = req.user.studentCourses.find(
    (el) => `${el.courseID[0]}` === `${assignment.courseID}`
  );
  if (!assignCourse)
    return next(
      new AppError(
        `You aren't enrolled to this course to submit the course`,
        400
      )
    );

  // Check if user is part of the course
  // Create the AssignSubn
  // Push the AssignSubn to Assignment and to the specific user

  const assingSubn = await AssignSubn.create({
    assignmentID,
    file,
    userID: req.user._id,
  });
  const { user } = req;
  const index = user.studentCourses.findIndex(
    (el) => `${el.courseID[0]}` === `${assignment.courseID}`
  );

  assignment.submissions.push(assingSubn);
  user.studentCourses[index].assignSubn.push(assingSubn);

  await User.findByIdAndUpdate(
    { _id: req.user._id },
    { studentCourses: user.studentCourses }
  );

  assignment.save();

  res.json({
    status: true,
    message: "Assignment has been submitted sucessfully",
  });
});
