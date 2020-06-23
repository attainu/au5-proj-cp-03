// const User = require("../models/userModel");
// const { getcourseid } = require("./courseController");

// module.registercontroller = async (req, res) => {
//   const {
//     name,
//     email,
//     image,
//     role,
//     password,
//     active,
//     contactnumber,
//     dob,
//     gender,
//     courses,
//   } = req.body;
//   console.log(name, email);

//   //todo validation on server side

//   console.log("Courseid is :", await getcourseid(courses));
//   const userObj = new User({
//     name: name,
//     email: email,
//     image: image,
//     role: role,
//     password: password,
//     passwordConfirm: passwordConfirm,
//     active: active,
//     contactNumber: contactnumber,
//     dob: dob,
//     gender: gender,
//     courses: await getcourseid(courses)
//   })
//   user.findOne({ email: email }).then(emailData => {
//     if (emailData) {
//       errors.email = "Email already exists"
//       res.status(400).json(errors)
//     }
//   })
//   userObj.save().then(result => res.json({
//     'user': result.name,
//     'msg': 'User registered successfully'
//   }))

// }
