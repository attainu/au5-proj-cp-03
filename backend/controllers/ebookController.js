/* eslint-disable no-console */
const Ebook = require("../models/ebookModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
// const storage = require('../utils/firebaseconfig')

//get ebooks on the basis of coursid
exports.getebook = catchAsync(async (req, res, next) => {
  const { courseid } = req.body;
  console.log(req.body);

  if (!name) {
    return next(new AppError(`Provide a valid name`, 400));
  }

  //find the ebooks in the course model and then return it to the user

  const book = await Ebook.findOne({ courseid });

  if (!book) {
    return next(new AppError(`No Ebook with name: ${name}`, 400));
  }
  res.json({
    status: true,
    data: book,
  });
});

exports.saveebook = catchAsync(async (req, res, next) => {
  const { description, link, name } = req.body;
  console.log("file", req.file, description);
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
    url = 'http://localhost:4000/' + file
  )
  //validate the data
  if (!description) {
    return next(new AppError("Please provide Description", 400));
  }
  // if (!file || !link) {
  //   return next(new AppError("Please provide file or a url to the pdf", 400));
  // }

  //upload the file to the server

  //save the file path of the server to the mongodb
  const ebookobj = new Ebook({
    description,
    filepath: url,
    name: name,
  });

  await Ebook.findOne({ name: name }).then((result) => {
    console.log("Found:", result);
    if (result == null) {
      ebookobj.save().then(res.json({
        status: 'success',
        msg: "File saved Succesfully"
      }));
    } else {
      res.json({
        status: 'error',
        msg: "File already present"
      });
    }
  });
});
