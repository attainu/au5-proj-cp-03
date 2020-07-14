const QuizSubn = require("../models/quizSubnModel");
const Quiz = require("../models/quizModel");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

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
