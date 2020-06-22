const course = require('../models/courseModel')
const validateCourse = require('../validators/courseValidator')
exports.getcourses =async(req,res)=>{
    res.json({'msg':'here you go'})
}
exports.createcourse =async(req,res)=>{
    const {courseID,name,description,instructor,startDate,endDate,lectureVideos,posts,assignments} =req.body
    const {errors,isValid} = validateCourse(req.body)
    if(!isValid){
        return res.status(400).json(errors)
    }
    const courseObj = new course({
        courseID,
        name,
        description,
        instructor,
        startDate,
        endDate,
        lectureVideos,
        posts,
        assignments
    })

    //todo validation

    courseObj.save((err,result)=>{
        if(err)
        {
            res.json({"Error":"Course Creation Error"})
        }
        else
        {
            res.json({"Status":"Course Created Successfully"})
        }
    })
}
exports.getcourseid  = async(coursename)=>{   
    let courseid = await course.findOne({courseID:coursename})
    return courseid._id
}