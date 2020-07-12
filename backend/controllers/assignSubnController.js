const AssignSubn = require("../models/assignSubnModel");
const Assignment = require("../models/assignmentModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

exports.assingmentSubn = catchAsync(async (req, res, next) => {
  const { assingmentID, file } = req.body;

  if (!assingmentID)
    return next(new AppError("Provide a valid user ID and assignment ID", 400));

  const assignment = await Assignment.findOne({ _id: assingmentID });

  if (!assignment) return next(new AppError(`No assignment with this ID`, 400));
  if (!req.user.courses.includes(assignment.courseID))
    return next(
      new AppError(
        `You aren't enrolled to this course to submit the course`,
        400
      )
    );

  // Check if user is part of the course
  // Create the AssignSubn
  // Push the AssignSubn to Assignment and to the specific user

  const assingSubn = await AssignSubn.create({ assingmentID, file });
  const { user } = req.user;

  const index = user.studentCourses.findIndex(
    (el) => `${el.courseID[0]}` === `${assignment.courseID}`
  );

  assignment.submissions.push(assingSubn);
  user.studentCourses[index].assingSubn.push(assingSubn);

  await User.findByIdAndUpdate(
    { _id: req.user._id },
    { studentCourses: user.studentCourses }
  );

  assignment.submissions.push(assingSubn._id);

  res.json({
    status: true,
    message: "Assignment has been submitted sucessfully",
  });
});

// exports.updateAssignSubn = catchAsync(async (req, res, next) => {
//   const { assingSubn }
// });
