const MongoError = require('mongoose').MongoError
const user = require('../models/userModel')
const { getcourseid } = require('../controllers/courseController')

module.exports = registercontroller = async (req, res) => {
<<<<<<< Updated upstream
    const { name, email, image, role, password, confirmpassword, active, contactnumber, dob, gender, courses } = req.body
=======
    const { name, email, image, role, password, active, contactnumber, dob, gender, courses } = req.body
    console.log(name, email);
>>>>>>> Stashed changes

    //todo validation on server side

    console.log("Courseid is :", await getcourseid(courses));
    const userObj = new user({
        name: name,
        email: email,
        image: image,
        role: role,
        password: password,
        passwordConfirm: confirmpassword,
        active: active,
        contactNumber: contactnumber,
        dob: dob,
        gender: gender,
        courses: await getcourseid(courses)
    })
    user.findOne({ email: email }).then(emailData => {
        if (emailData) {
            errors.email = "Email already exists"
            res.status(400).json(errors)
        }
    })
    userObj.save().then(result => res.json({
        'user': result.name,
        'msg': 'User registered successfully'
    }))


}