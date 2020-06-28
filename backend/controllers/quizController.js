const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Quiz = require("../models/quizModel");
const Course = require("../models/courseModel");

exports.getQuiz = catchAsync(async (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    return next(new AppError(`Provide a valid title`, 400));
  }

  const quiz = await Quiz.findOne({ title });

  if (!quiz) {
    return next(new AppError(`No quiz with title: ${title}`, 400));
  }

  res.json({
    status: true,
    data: quiz,
  });
});

exports.createQuiz = catchAsync(async (req, res, next) => {
  const { title, courseID } = req.body;

  if (!title) {
    return next(new AppError(`Provide a valid title`, 400));
  }

  const quiz = await Quiz.create({ title });

  const course = await Course.findOne({ _id: courseID });
  course.quizzes.push(quiz._id);
  await course.save();

  res.json({
    status: true,
    data: quiz,
  });
});

exports.updateQuiz = catchAsync(async (req, res, next) => {
  const { title, updateTitle } = req.body;

  if (!title || !updateTitle) {
    return next(new AppError(`Provide a valid title and updated title`, 400));
  }

  const quiz = await Quiz.findOneAndUpdate({ title }, { title: updateTitle });

  if (!quiz) {
    return next(new AppError(`No quiz with title: ${title}`, 400));
  }

  res.json({
    status: true,
    data: quiz,
  });
});

exports.deleteQuiz = catchAsync(async (req, res, next) => {
  const { title, courseID } = req.body;

  if (!title.trim()) {
    return next(new AppError(`Provide a valid title`, 400));
  }

  const quiz = await Quiz.findOneAndRemove({ title });
  const course = await Course.findOne({ _id: courseID });
  course.quizzes.splice(course.quizzes.indexOf(quiz._id), 1);
  await course.save();

  if (!quiz)
    return next(new AppError(`No quiz is present with title: ${title}`));

  res.json({
    status: true,
    data: quiz,
  });
});

exports.addQuestion = catchAsync(async (req, res, next) => {
  const { title, question, options, answer } = req.body;

  if (!title || !question || !options) {
    return next(
      new AppError(`Provide a valid quiz title, question, options`, 400)
    );
  }

  const quiz = await Quiz.findOne({ title });

  if (!quiz) {
    return next(
      new AppError(
        `Can't add questions as No quiz is present with title: ${title}`,
        400
      )
    );
  }

  if (await quiz.duplicateQuestion(question, quiz.question)) {
    return next(new AppError(`Provide a unique question`, 400));
  }

  quiz.question.push({
    question,
    options,
    answer,
  });
  await quiz.save();

  res.json({
    status: true,
    data: quiz,
  });
});

exports.deleteQuestion = catchAsync(async (req, res, next) => {
  const { title, question } = req.body;

  const quiz = await Quiz.findOne({ title });

  if (!quiz) next(new AppError(`Question: ${question} is not present`, 400));

  const find = await quiz.deleteQuestion(question, quiz.question);

  if (find === 0 || find) quiz.question.splice(find, 1);
  else return next(new AppError(`Question: ${question} is not present`, 400));

  await quiz.save();

  res.json({
    status: true,
    data: quiz,
  });
});
