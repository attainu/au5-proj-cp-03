const Report = require("../models/reportModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getreport = async (req, res) => {
  res.json({ msg: "All ebook" });
};

exports.savereport = catchAsync(async (req, res, next) => {
  const { name, classandsection, marks } = req.body;
  //validate the data
  if (!name) {
    return next(new AppError("Please provide Name", 400));
  }
  if (!classandsection) {
    return next(new AppError("Please provide Class", 400));
  }
  if (!marks) {
    return next(new AppError("Please provide Marks", 400));
  }

  //update to the server
  const reportObj = new Report({
    name,
    classandsection,
    marks,
  });

  reportObj.save().then((data) => {
    res.json({
      msg: "Save successfully",
      data: data,
    });
  });
});
