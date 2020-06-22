const video = require('../models/videoModel')

exports.getvideos=async(req,res)=>{
    res.json({"msg":"I will send the videos"})
}
exports.createvideo = async(req,res)=>{
    const {name,subject,chapter,file} = req.body
    //console.log(req.body);
    
    //todo validation
    const errors = {}

    if(name.trim().length === 0 )
    {
        errors.name = "Video name is required and must be unique"
    }
    if(subject.trim().length ===0)
    {
        errors.subject = " Subject is required and must be unique"
    }
    if(chapter.trim().length ===0)
    {
        errors.chapter = " Chapter is required and must be unique"
    }
    if(file.trim().length ===0)
    {
        errors.file = "File is required"
    }
    

    const videoObj = new video({
        name:name,
        subject:subject,
        chapter:chapter,
        file:file
    })
    
    video.findOne({name:name}).then(nameData=>{
        if(nameData)
        {
            errors.name = "Video of this name is already present"
            res.status(400).json(errors)
            res.end()
        }
    })
    if(errors.length === 0)
    {

        videoObj.save().then(result=>res.json(result))
    }
    else
    {
        res.status(400).json(errors)
    }
    
}