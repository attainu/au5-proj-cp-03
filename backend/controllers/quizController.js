const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Quiz = require("../models/quizModel");
const Course = require("../models/courseModel");

exports.getQuiz = catchAsync(async (req, res, next) => {
  const { _id } = req.query;

  if (!_id) {
    return next(new AppError(`Provide a valid quiz id`, 400));
  }
  const quiz = await Quiz.findOne({ _id });

  if (!quiz) {
    return next(new AppError(`Invalid Quiz ID`, 400));
  }

  if (req.user.role === "student" && !quiz.publish) {
    return next(
      new AppError("This quiz is still isn't available to students", 403)
    );
  }

  if (req.user.role === "student" && quiz.startTime > new Date()) {
    return next(
      new AppError("This quiz is still isn't available to students", 403)
    );
  }
  if (req.user.role === "student") {
    const updateQuiz = quiz.question.map((el) => {
      el.answer = undefined;
      return el;
    });
    quiz.question = updateQuiz;
  }

  res.json({
    status: true,
    data: quiz,
  });
});

exports.createQuiz = catchAsync(async (req, res, next) => {
  const { title, courseID, duration, startTime } = req.body;

  if (!title) {
    return next(new AppError(`Provide a valid title`, 400));
  }

  const quiz = await Quiz.create({ title, courseID, duration, startTime });

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
  const { id, question, options, answer } = req.body;

  if (!id || !question || !options) {
    return next(
      new AppError(`Provide a valid quiz id, question, options`, 400)
    );
  }

  const quiz = await Quiz.findOne({ _id: id }).populate({
    path: "courseID",
    select: "instructor",
    populate: {
      path: "instructor",
      select: "email",
    },
  });

  if (quiz.courseID.instructor.email !== req.user.email) {
    return next(
      new AppError("You don't have permission to perofrm this action", 403)
    );
  }

  if (!quiz) {
    return next(
      new AppError(
        `Can't add questions as No quiz is present with id: ${id}`,
        400
      )
    );
  }

  if (await quiz.duplicateQuestion(question, quiz.question)) {
    return next(
      new AppError(`Question with same title is already present`, 400)
    );
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

exports.updateQuestion = catchAsync(async (req, res, next) => {
  const {
    id,
    questionID,
    updatedQuestion,
    updatedOptions,
    updatedAnswer,
  } = req.body;

  if (!id || !(questionID >= 0)) {
    return next(
      new AppError(
        `Provide a valid quiz id and question number you want to update`,
        400
      )
    );
  }

  if (!updatedQuestion && !updatedOptions && !updatedAnswer) {
    return next(
      new AppError(
        `To update a question you need to update atleast a question and options`,
        400
      )
    );
  }

  const quiz = await Quiz.findOne({ _id: id }).populate({
    path: "courseID",
    select: "instructor",
    populate: {
      path: "instructor",
      select: "email",
    },
  });

  if (quiz.courseID.instructor.email !== req.user.email) {
    return next(
      new AppError("You don't have permission to perofrm this action", 403)
    );
  }

  if (!quiz) {
    return next(new AppError(`Provide a valid quiz ID`, 400));
  }

  if (questionID > quiz.question.length) {
    return next(new AppError(`Question number is out of range`, 400));
  }

  if (updatedQuestion) quiz.question[questionID - 1].question = updatedQuestion;
  if (updatedOptions) quiz.question[questionID - 1].options = updatedOptions;
  if (updatedAnswer) quiz.question[questionID - 1].answer = updatedAnswer;

  const updatedQuiz = await quiz.save();

  res.json({
    status: true,
    message: `Question has been updated successfully`,
    data: updatedQuiz,
  });
});

exports.deleteQuestion = catchAsync(async (req, res, next) => {
  const { id, question } = req.body;

  const quiz = await Quiz.findOne({ _id: id });

  if (!quiz)
    return next(new AppError(`Question: ${question} is not present`, 400));

  const find = await quiz.deleteQuestion(question, quiz.question);

  if (find === 0 || find) quiz.question.splice(find, 1);
  else return next(new AppError(`Question: ${question} is not present`, 400));

  await quiz.save();

  res.json({
    status: true,
    data: quiz,
  });
});

exports.publishQuiz = catchAsync(async (req, res, next) => {
  const { id } = req.body;

  if (!id) {
    return next(new AppError(`Provide a valid quiz id`, 400));
  }

  const quiz = await Quiz.findOne({ _id: id }).populate({
    path: "courseID",
    select: "instructor",
    populate: {
      path: "instructor",
      select: "email",
    },
  });

  if (quiz.courseID.instructor.email !== req.user.email) {
    return next(
      new AppError("You don't have permission to perofrm this action", 403)
    );
  }

  if (!id) {
    return next(new AppError(`No quiz with this ID`, 400));
  }
  if (quiz.completed)
    return next(
      new AppError("Quiz has already been published to students", 400)
    );

  quiz.completed = true;
  quiz.publish = true;

  await quiz.save();
  res.json({
    status: true,
    message: "Quiz has been successfully published to the course",
    data: quiz,
  });
});
