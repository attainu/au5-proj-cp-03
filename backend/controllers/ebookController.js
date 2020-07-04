/* eslint-disable no-console */
const Ebook = require("../models/ebookModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
// const storage = require('../utils/firebaseconfig')

exports.getebook = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  console.log(req.body);

  if (!name) {
    return next(new AppError(`Provide a valid name`, 400));
  }

  const book = await Ebook.findOne({ name });

  if (!book) {
    return next(new AppError(`No Ebook with name: ${name}`, 400));
  }
  res.json({
    status: true,
    data: book,
  });
});

exports.saveebook = catchAsync(async (req, res, next) => {
  const { description } = req.body;
  console.log("file", req.file, description);

  const file = await req.file.path;

  const filename = await req.file.filename;

  //validate the data
  if (!description) {
    return next(new AppError("Please provide Description", 400));
  }
  if (!file) {
    return next(new AppError("Please provide file", 400));
  }

  //upload the file to the server

  //save the file path of the server to the mongodb
  const ebookobj = new Ebook({
    description,
    filepath: file,
    name: filename,
  });

  await Ebook.findOne({ name: filename }).then((result) => {
    console.log(result);
    if (!result) {
      ebookobj.save().then(res.json("File saved Succesfully"));
    } else {
      res.json("File already present");
    }
  });
});
