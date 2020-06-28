const Assignment = require("../models/assignmentModel");
const Course = require("../models/courseModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const cloudinary = require("../utils/cloudinaryFileUpload");
const Post = require("../models/postModel");

exports.getAssignment = catchAsync(async (req, res, next) => {
  const { assignmentID } = req.body;

  if (!assignmentID)
    return next(new AppError("Provide a valid Assignment ID", 400));

  const assignment = await Assignment.findById({ _id: assignmentID });
  if (!assignment) return next(new AppError("Invalid assignment ID", 400));

  res.json({
    status: true,
    message: "Assignment has been retrieved successfully.",
    data: assignment,
  });
});

exports.createAssignment = catchAsync(async (req, res, next) => {
  const { message, courseID, endDate } = req.body;

  if (!message && !req.files) {
    return next(
      new AppError(
        `A post can't empty, should contain atleast a message or file`,
        400
      )
    );
  }

  if (endDate < Date.now())
    return next(
      new AppError(
        "End date of assingment can't be before time of creation",
        400
      )
    );

  const course = await Course.findOne({ _id: courseID }).populate({
    path: "instructor",
    select: "email",
  });
  if (!course) {
    next(
      new AppError(
        `Provide a valid course ID, No course with ID: ${courseID}`,
        400
      )
    );
  }
  const file = await cloudinary.uploadFile(req, next);

  if (req.user.email !== course.instructor.email) {
    return next(
      new AppError(`You don't have the permission to perform this action`, 403)
    );
  }

  const assignment = await Assignment.create({ courseID, message, file });
  course.assignments.push(assignment._id);
  await course.save();

  res.json({
    status: true,
    message: "Assignment has been created sucessfully",
    data: assignment,
  });
});

exports.deleteAssignment = catchAsync(async (req, res, next) => {
  const { courseID, assignmentID } = req.body;

  if (!courseID || !assignmentID) {
    return next(
      new AppError(`Provide a valid course ID and assignment ID`, 400)
    );
  }

  const assignment = await Assignment.findOne({ _id: assignmentID });
  const course = await Course.findOne({ _id: courseID });

  if (!course || !assignment) {
    return next(
      new AppError(`Provide a valid course ID and assignment ID`, 400)
    );
  }

  if (`${course._id}` !== `${assignment.courseID}`) {
    return next(
      new AppError(`This assignment dosen't belong to this course`, 400)
    );
  }

  course.assignments.splice(course.assignments.indexOf(assignmentID), 1);
  await course.save();
  const updatedAssignment = await Post.findByIdAndRemove({ _id: assignmentID });

  res.json({
    status: true,
    message: "Assignment has been deleted successfully",
    data: updatedAssignment,
  });
});
