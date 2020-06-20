const MongoError = require('mongoose').MongoError
const user = require('../models/userModel')
const {getcourseid} = require('../controllers/courseController')

module.exports = registercontroller =async (req,res)=>{
    const {name,email,image,role,password,active,contactnumber,dob,gender,courses} = req.body
    console.log(name,email);
    
    //todo validation on server side
    
    console.log("Courseid is :",await getcourseid(courses));
    const userObj = new user({
        name:name,
        email:email,
        image:image,
        role:role,
        password:password,
        active:active,
        contactNumber:contactnumber,
        dob:dob,
        gender:gender,
        courses:await getcourseid(courses)
    })

     userObj.save((err,result)=>{
        if(err){
            res.json({'Error':"User email already registered"})
            console.log(err)
        }
        else{
            res.json({'msg':'User registered succesfully'})
        }
    })

    
}