const Video = require("../models/videoModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
//Get videos on the basis of name of the video
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
  const { name, subject, chapter } = req.body;

  const file = req.file.path;

  if (!name) {
    return next(new AppError("Please provide name", 400));
  }
  if (!subject) {
    return next(new AppError("Please provide subject", 400));
  }
  if (!chapter) {
    return next(new AppError("Please provide chapter", 400));
  }
  if (!file) {
    return next(new AppError("Please provide file", 400));
  }

  const videoObj = new Video({
    name: name,
    subject: subject,
    chapter: chapter,
    file: file,
  });

  // video.findOne({ name: name }).then(nameData => {
  //     if (nameData) {
  //         errors.name = "Video of this name is already present"
  //         res.status(400).json(errors)
  //         res.end()
  //     }
  // })
  videoObj.save().then((result) => res.json(result));
});
