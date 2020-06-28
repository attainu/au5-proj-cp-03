const ebook = require('../models/ebookModel')
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
exports.getebook = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  console.log(req.body);

  if (!name) {
    return next(new AppError(`Provide a valid name`, 400));
  }

  const book = await ebook.findOne({ name });

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
  console.log(req.file)
  let file = ''
  let filename = ''
  if (req.file.path) {

    file = await req.file.path
    filename = await req.file.filename
  }
  else {
    res.json('File not found')
  }
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
    filepath: file,
    name: filename
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
