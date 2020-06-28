const AssignSubn = require("../models/assignSubnModel");
const Assignment = require("../models/assignmentModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const cloudinary = require("../utils/cloudinaryFileUpload");

exports.assingmentSubn = catchAsync(async (req, res, next) => {
  const { assingmentID } = req.body;

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

  const file = await cloudinary.uploadFile(req, next);
  const assingSubn = await AssignSubn.create({ assingmentID, file });
  return assingSubn;
});
