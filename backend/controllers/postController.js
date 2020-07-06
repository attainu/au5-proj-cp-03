const Post = require("../models/postModel");
const Course = require("../models/courseModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const cloudinary = require("../utils/cloudinaryFileUpload");

exports.getPost = catchAsync(async (req, res, next) => {
  const { postID } = req.body;

  if (!postID) return next(new AppError(`Provide a valid post ID`, 400));

  const post = await Post.findOne({ _id: postID });
  if (!post) return next(new AppError(`Invalid post ID`, 400));

  res.json({
    status: true,
    message: "Post has been retrieved successfully.",
    data: post,
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const { message, courseID } = req.body;

  if (!message && !req.files) {
    return next(
      new AppError(
        `A post can't empty, should contain atleast a message or file`,
        400
      )
    );
  }

  const course = await Course.findOne({ _id: courseID }).populate({
    path: "instructor",
    select: "email",
  });
  if (!course) {
    next(
      new AppError(
        `Provide a valid course ID, No course with ID: ${courseID}`,
        400
      )
    );
  }

  if (req.user.email !== course.instructor.email) {
    return next(
      new AppError(`You don't have the permission to perform this action`, 403)
    );
  }

  const file = await cloudinary.uploadFile(req, next);

  const post = await Post.create({ courseID, message, file });
  course.posts.push(post._id);
  await course.save();

  res.json({
    status: true,
    message: "Post has been created sucessfully",
    data: post,
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const { postID, message, type } = req.body;

  if (!postID) return next(new AppError(`Provide a valid post ID`, 400));

  if (!message && !req.files) {
    return next(
      new AppError(
        `A post can't empty, should contain atleast a message or file`,
        400
      )
    );
  }

  let post = await Post.findOne({ _id: postID }).populate({ path: "courseID" });
  if (!post) {
    return next(new AppError("Invalid post ID", 400));
  }
  if (`${post.courseID.instructor}` !== `${req.user._id}`) {
    return next(
      new AppError("Ypu don't have permission to perform this action", 403)
    );
  }
  const file = await cloudinary.uploadFile(req, next);

  if (type === "msg") {
    post = await Post.findByIdAndUpdate(
      { _id: postID },
      { message },
      { new: true }
    );
  } else if (type === "msg-file")
    post = await Post.findByIdAndUpdate(
      { _id: postID },
      { message, file },
      { new: true }
    );
  else if (type === "file")
    post = await Post.findByIdAndUpdate(
      { _id: postID },
      { file },
      { new: true }
    );
  else
    return next(
      new AppError(
        `Incorrect type: ${type}. types allowed [msg, msg-file, file]`,
        400
      )
    );

  res.json({
    status: true,
    message: `Post hase been updated successfully`,
    data: post,
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const { courseID, postID } = req.body;

  if (!courseID || !postID) {
    return next(new AppError(`Provide a valid courseID and postID`, 400));
  }

  const post = await Post.findOne({ _id: postID });
  const course = await Course.findOne({ _id: courseID });

  if (!course || !post) {
    return next(new AppError(`Provide a valid courseID and postID`, 400));
  }

  if (`${course._id}` !== `${post.courseID}`) {
    return next(new AppError(`This post dosen't belong to this course`, 400));
  }

  course.posts.splice(course.posts.indexOf(postID), 1);
  await course.save();
  const updatedPost = await Post.findByIdAndRemove({ _id: postID });

  res.json({
    status: true,
    message: "Post has been removed successfully",
    data: updatedPost,
  });
});
