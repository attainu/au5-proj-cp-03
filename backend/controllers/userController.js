const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcrypt");

const User = require("../models/userModel");
const Course = require("../models/courseModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

require("dotenv").config({ path: "./config.env" });

exports.getUser = catchAsync(async (req, res, next) => {
  const { type } = req.query;
  const { _id } = req.user;
  let user;
  if (type) {
    if (req.user.role === "student") {
      user = await User.findOne({ _id }).populate({
        path: "studentCourses.courseID",
        select: "courseID name description",
        populate: {
          path: "instructor",
          select: "image name",
        },
      });
      user.enrollString = undefined;
    } else if (req.user.role === "instructor") {
      user = await User.findOne({ _id }).populate({
        path: "instructorCourses",
      });
    }
  } else {
    user = await User.findOne({ _id: req.user._id });
  }
  res.json({
    status: true,
    message: "User details have been received successfully",
    data: user,
  });
});

exports.addStudentToCourse = catchAsync(async (req, res, next) => {
  const { enrollID } = req.body;
  const { _id } = req.user;

  const course = await Course.findOne({ enrollString: enrollID });
  if (!course)
    return next(
      new AppError(`Invalid enroll ID, No course is present with this ID`, 400)
    );

  const user = await User.findOne({ _id });

  if (!user) return next(new AppError(`Provide a valid user ID`, 400));

  if (course.studentsEnrolled.includes(_id))
    return next(
      new AppError(
        `Student is already enrolled to the course: ${course.name}.`,
        400
      )
    );
  const update = [
    ...user.studentCourses,
    {
      assignSubn: [],
      courseID: course._id,
    },
  ];
  user.studentCourses.push({
    assignSubn: [],
    quizSubn: [],
    courseID: course._id,
  });

  course.studentsEnrolled.push(_id);
  await User.findByIdAndUpdate({ _id }, { studentCourses: update });
  await course.save();

  res.json({
    status: true,
    message: `You are enrolled to course ${course.name} successfully`,
  });
});

exports.removeStudentFromCourse = catchAsync(async (req, res, next) => {
  const { userID, courseID } = req.body;

  if (!userID || !courseID)
    return next(new AppError(`Provide a valid userID and courseID`, 400));

  const course = await Course.findOne({ _id: courseID }).populate({
    path: "instructor",
    select: "email",
  });

  if (!course)
    return next(
      new AppError("No course is present with your provided ID", 400)
    );

  if (req.user.email !== course.instructor.email) {
    return next(
      new AppError("You don't have permission to perform this action", 403)
    );
  }

  const user = await User.findOne({ _id: userID });

  if (!user) return next(new AppError(`User with this ID isn't present`, 400));

  const index = user.studentCourses.findIndex(
    (el) => `${el.courseID[0]}` === `${courseID}`
  );

  if (!course.studentsEnrolled.includes(userID) || !index) {
    return next(new AppError(`Student isn't registered to the course`));
  }
  user.studentCourses.splice(index, 1);
  course.studentsEnrolled.splice(course.studentsEnrolled.indexOf(userID), 1);

  await User.findByIdAndUpdate(
    { _id: userID },
    { studentCourses: user.studentCourses }
  );
  await course.save();

  res.json({
    status: true,
    message: `Student has been removed from course: ${course.courseID}`,
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: `${email}`, // list of receivers
      subject: "Classroom Password reset request", // Subject line
      text: "Hello", // plain text body
      html: `<div>
      <b>Hello, ${email}</b>
      <p>click on the link to reset your password</p>
      <p>http://localhost:3000/resetpassword/${token}</p>
      <p>Link will expire in 15 minutes</p>
      <div>`,
    });
    res.json({
      data: true,
    });
  } else {
    return next(new AppError("No account found for this email address.", 400));
  }
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const { token, password } = req.body;
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    await User.findByIdAndUpdate(
      { _id: verified._id },
      { password: hashPassword }
    );
    return res.json({
      data: true,
    });
  }
  return res.json({
    data: false,
  });
});
