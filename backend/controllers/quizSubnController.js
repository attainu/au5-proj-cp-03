const QuizSubn = require("../models/quizSubnModel");
const Quiz = require("../models/quizModel");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const AppError = require("../utils/appError");

exports.getQuiz = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError(`Invalid course ID`, 400));
  }

  const course = await Course.findById({ _id: id }).populate({
    path: "quizzes",
    options: {
      sort: {
        startTime: -1,
      },
    },
    populate: {
      path: "submissions",
      populate: {
        path: "userID",
        select: "name",
      },
    },
  });

  res.json({
    data: course,
  });

  const user = await User.findById({ _id: req.user._id }).populate({
    path: "studentCourses.quizSubn",
    select: "studentCourses",
    populate: {
      path: "quizID",
      populate: "submissions",
    },
  });

  const index = user.studentCourses.findIndex((el) => {
    return `${el.courseID[0]}` === `${id}`;
  });

});

exports.createQuizSubn = catchAsync(async (req, res, next) => {
  const { questions, quizID } = req.body;

  const quiz = await Quiz.findById({ _id: quizID });

  const totalMarks = questions.reduce((total, el, index) => {
    if (el.answer === quiz.question[index].answer) return total + 5;
    return total;
  }, 0);

  const quizSubn = await QuizSubn.create({ quizID, questions, totalMarks });

  const studentCourses = req.user.studentCourses.map((el) => {
    if (`${el.courseID[0]}` === `${quiz.courseID}`)
      return el.quizSubn.push(quizSubn._id);
    return el;
  });

  await User.findByIdAndUpdate(
    { _id: req.user._id },
    { studentCourses: studentCourses }
  );
  quiz.submissions.push(quizSubn._id);
  await quiz.save();

  res.json({
    status: true,
    message: `Quiz submission is successfully done`,
  });
});
