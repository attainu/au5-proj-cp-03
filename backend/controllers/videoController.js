const Video = require("../models/videoModel");
const Course = require('../models/courseModel')
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const cloudinary = require("cloudinary").v2;
//Get videos on the basis of course
//Get All the videos

exports.getvideos = async (req, res) => {
  const { name } = req.body;
  Video.findOne({ name: name }).then((video) => {
    res.json(video);
  });
};
exports.getallvideos = async (req, res) => {
  Video.find({}).then((videos) => {
    res.json(videos);
  });
};
exports.createvideo = catchAsync(async (req, res, next) => {
  const { name, subject, chapter, courseId, link } = req.body;
  console.log("File:", req.file, req.body)
  let url = ''
  let file = ''
  let filename = ''
  if (req.file !== undefined) {
    file = await req.file.path;
    filename = await req.file.filename;

  }

  if (link) {
    url = link
  }
  else (
    url = file
  )

  if (!courseId) {
    return next(new AppError("Please provide course ID", 400))
  }
  if (!name) {
    return next(new AppError("Please provide name", 400));
  }
  if (!subject) {
    return next(new AppError("Please provide subject", 400));
  }
  if (!chapter) {
    return next(new AppError("Please provide chapter", 400));
  }
  if (!url) {
    return next(new AppError("Please choose a valid option", 400));
  }

  const videoObj = new Video({
    courseid: courseId,
    name: name,
    subject: subject,
    chapter: chapter,
    file: url,
  });
  await Video.findOne({ name: name }).then((result) => {
    if (!result) {
      // eslint-disable-next-line no-shadow
      videoObj.save().then((result) => {
        if (result._id) {
          Course.findOneAndUpdate({ courseID: courseId }, { $push: { lectureVideos: result._id } }).then(
            console.log("success")
          )
        }

        else {
          console.log("Course is not registered");

        }
      }).then(res.json("Saved Successfully"))

      //update the course model with the url of the file

    } else {

      res.json("Video of this name is already present");
    }

  })
  //get id and update the course

});
