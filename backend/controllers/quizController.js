const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Quiz = require('./../models/quizModel');

exports.createQuiz = catchAsync(async (req, res, next) => {
  let { title } = req.body;

  if (!title.trim()) {
    return next(new AppError(`Provide a valid title`, 400));
  }

  const quiz = await Quiz.create({ title });

  res.json({
    status: true,
    data: quiz
  });
});

exports.deleteQuiz = catchAsync(async (req, res, next) => {
  let { title } = req.body;

  if (!title.trim()) {
    return next(new AppError(`Provide a valid title`, 400));
  }

  const quiz = await Quiz.findOneAndRemove({ title });

  if (!quiz)
    return next(new AppError(`No quiz is present with title: ${title}`));

  res.json({
    status: true,
    data: quiz
  })
});

exports.addQuestion = catchAsync(async (req, res, next) => {
  const { title, question, options, answer } = req.body;

  if (!title || !question || !options) {
    return next(new AppError(`Provide a valid quiz title, question, options`, 400));
  }

  let quiz = await Quiz.findOne({ title });

  if (await quiz.duplicateQuestion(question, quiz.question)) {
    return next(new AppError(`Provide a unique question`, 400));
  }

  quiz.question.push({
    question,
    options,
    answer
  });
  await quiz.save();

  res.json({
    status: true,
    data: quiz
  });
});

exports.deleteQuestion = catchAsync(async (req, res, next) => {
  const { title, question } = req.body;

  let quiz = await Quiz.findOne({ title });

  if (!quiz) next(new AppError(`Question: ${question} is not present`, 400));

  let find = await quiz.deleteQuestion(question, quiz.question);

  if (find === 0 || find)
    quiz.question.splice(find, 1);
  else
    return next(new AppError(`Question: ${question} is not present`, 400));

  await quiz.save();

  res.json({
    status: true,
    data: quiz
  });
});

