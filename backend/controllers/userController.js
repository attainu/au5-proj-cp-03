const User = require("../models/userModel");
const Course = require("../models/courseModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

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
