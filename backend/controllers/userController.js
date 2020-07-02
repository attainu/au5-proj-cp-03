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
  console.log(course._id);
  // if (user.studentCourses.some((el) => el.courseID === course._id)) {
  //   return next(
  //     new AppError(
  //       `Student is already enrolled to the course: ${course.name}.`,
  //       400
  //     )
  //   );
  // }
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
    courseID: course._id,
  });
  // console.log(update, course._id);
  course.studentsEnrolled.push(_id);
  // console.log(await User.findById({ _id }));
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
  const user = await User.findOne({ _id: userID });

  if (!user) return next(new AppError(`User with this ID isn't present`, 400));
  if (!course)
    return next(
      new AppError("No course is present with your provided ID", 400)
    );

  if (req.user.email !== course.instructor.email) {
    return next(
      new AppError("You don't have permission to perform this action", 403)
    );
  }
  // const instructor = ;
  const index = user.studentCourses.forEach((el, idx) => {
    // console.log(el, courseID)
    if (el.courseID === courseID) return idx;
  });
  // console.log(index);
  if (!course.studentsEnrolled.includes(userID) || !index) {
    return next(new AppError(`Student isn't registered to the course`));
  }
  user.courses.splice(index, 1);
  course.studentsEnrolled.splice(course.studentsEnrolled.indexOf(userID), 1);

  await User.findByIdAndUpdate({ _id: userID }, { courses: user.courses });
  await course.save();

  res.json({
    status: true,
    message: `Student has been removed from course: ${course.courseID}`,
  });
});
