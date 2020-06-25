const ebook = require('../models/ebookModel')
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
exports.getebook = async (req, res) => {
  res.json({ msg: "All ebook" });
};

exports.saveebook = catchAsync(async (req, res, next) => {
  const { description } = req.body;
  console.log(req.file)
  let file = await req.file.path
  //validate the data
  if (!description) {
    return next(new AppError("Please provide Description", 400));
  }
  if (!file) {
    return next(new AppError("Please provide file", 400));
  }

  //upload the file to the server



  //save the file path of the server to the mongodb
  const ebookobj = new ebook({
    description,
    file
  })
  await ebook.findOne({ file: file }).then(result => {
    if (!result) {
      ebookobj.save().then(res.json('File saved Succesfully'))
    }
    else {
      res.json('File already present')
    }
  })

});
