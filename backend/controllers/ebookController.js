/* eslint-disable no-console */
const Ebook = require("../models/ebookModel");
const Course = require("../models/courseModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
// const storage = require('../utils/firebaseconfig')

//get ebooks on the basis of coursid
exports.getebook = catchAsync(async (req, res, next) => {
  const { courseid } = req.params;
  console.log(req.params);

  if (!courseid) {
    return next(new AppError(`Provide a valid courseID`, 400));
  }
  const ebookdata = await Course.find({ courseID: courseid }).populate({
    path: "ebooks"
  })
  res.json({ "ebookdata": ebookdata })
});

exports.saveebook = catchAsync(async (req, res, next) => {
  const { description, link, name, courseId } = req.body;
  console.log("Ebook Request Body", req.body);
  let url = link
  //validate the data
  if (!name) {
    return next(new AppError("Please provide name", 400));
  }
  if (!description) {
    return next(new AppError("Please provide Description", 400));
  }
  if (!link) {
    return next(new AppError("Please provide file or a url to the pdf", 400));
  }
  if (!courseId) {
    return next(new AppError(`Provide a valid courseID`, 400));
  }
  //upload the file to the server

  //save the file path of the server to the mongodb
  const ebookobj = new Ebook({
    description: description,
    filepath: url,
    name: name,
  });

  await Ebook.findOne({ name: name }).then((result) => {
    console.log("Found:", result);
    if (result == null) {
      ebookobj
        .save({ new: true })
        .then((result) => {
          console.log(result)
          if (result._id) {
            Course.findOneAndUpdate(
              { courseID: courseId },
              { $push: { ebooks: result._id }, new: true }
            ).then(
              result => console.log(result)
            )
          } else {
            console.log("Course is not registered");
          }
        })
        .then(
          res.json({
            status: "success",
            msg: "File saved Succesfully",
          })
        );
    } else {
      res.json({
        status: "error",
        msg: "File already present",
      });
    }
  });
});
