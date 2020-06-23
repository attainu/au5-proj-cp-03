const ebook = require('../models/ebookModel')
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
exports.getebook = async (req, res) => {
    res.json({ "msg": "All ebook" })
}

exports.saveebook = catchAsync(async (req, res, next) => {
    const { description, file } = req.body
    //validate the data
    if (!description) {
        return next(new AppError('Please provide Description', 400));
    }
    if (!file) {
        return next(new AppError('Please provide file', 400));
    }

    //upload the file to the server
    //save the file path of the server to the mongodb

    res.json({ "msg": "Save successfully" })
})