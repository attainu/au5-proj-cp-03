const video = require('../models/videoModel')

exports.getvideos=async(req,res)=>{
    res.json({"msg":"I will send the videos"})
}
exports.createvideo = async(req,res)=>{
    const {name,subject,chapter,file} = req.body
    //todo validation
    const videoObj = new video({
        name:name,
        subject:subject,
        chapter:chapter,
        file:file
    })
    videoObj.save((err,result)=>{
        if(err)
        {
            res.json({"Error":"Cannot post video"})
        }
        else{
            res.json({"Status":"Video added successfully"})
        }
    })
    //res.json({"msg":"I will create the videos"})
}