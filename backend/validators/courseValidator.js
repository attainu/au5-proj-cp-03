const validator = require('validator')
const checkEmpty = require('./checkEmpty')
module.exports = function validateCouresInput(data) {
    let errors = {}

    //checking if empty

    data.courseID = !checkEmpty(data.courseID) ? data.courseID : ''
    data.name = !checkEmpty(data.name) ? data.name : ''
    data.description = !checkEmpty(data.description) ? data.description : ''
    data.instructor = !checkEmpty(data.instructor) ? data.instructor : ''
    data.startDate = !checkEmpty(data.startDate) ? data.startDate : ''
    data.endDate = !checkEmpty(data.endDate) ? data.endDate : ''
    data.lectureVideos = !checkEmpty(data.lectureVideos) ? data.lectureVideos : ''
    data.Posts = !checkEmpty(data.Posts) ? data.Posts : ''
    data.assignments = !checkEmpty(data.assignments) ? data.assignments : ''

    //sending response if error 
    if (!validator.isAlphanumeric(data.courseID)) {
        errors.courseID = 'Course can only be alphabets or numbers or mixture'
    }
    if (validator.isEmpty(data.courseID)) {
        errors.courseID = 'Course ID is required'
    }
    if (validator.isEmpty(data.name)) {
        errors.name = 'Course name is required'
    }


    return {
        errors,
        isValid: checkEmpty(errors)
    }
}