const User = require("../models/userModel");
const Course = require("../models/courseModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.addStudentToCourse = catchAsync(async (req, res, next) => {
  const { enrollID } = req.body;
  const { _id } = req.user;

  const course = await Course.findOne({ enrollString: enrollID });
  const user = await User.findOne({ _id });
  if (!course) return next(new AppError(`Provide a valid course token`, 400));

  if (user.studentCourses.some((el) => el.courseID === course._id)) {
    return next(
      new AppError(
        `Student is already enrolled to the course: ${course.name}.`,
        400
      )
    );
  }
  if (course.studentsEnrolled.includes(_id))
    return next(
      new AppError(
        `Student is already enrolled to the course: ${course.name}.`,
        400
      )
    );

  user.studentCourses.push({
    courseID: course._id,
    assignSubn: [],
  });
  course.studentsEnrolled.push(_id);

  await User.findByIdAndUpdate(
    { _id },
    { studentCourses: user.studentCourses }
  );
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
  const user = await User.findOne({ _id: userID });

  if (!user) return next(new AppError(`User with this ID isn't present`, 400));
  if (!course)
    return next(
      new AppError("No course is present with your provided ID", 400)
    );

  if (req.user.email === course.instructor.email) {
    return next(
      new AppError("You don't have permission to perform this action", 403)
    );
  }
  // const instructor = ;
  if (
    !course.studentsEnrolled.includes(userID) ||
    !user.courses.includes(courseID)
  ) {
    return next(new AppError(`Student isn't registered to the course`));
  }

  user.courses.splice(user.courses.indexOf(courseID), 1);
  course.studentsEnrolled.splice(course.studentsEnrolled.indexOf(userID), 1);

  await User.findByIdAndUpdate({ _id: userID }, { courses: user.courses });
  await course.save();

  res.json({
    status: true,
    message: `Student has been removed from course: ${course.courseID}`,
  });
});
