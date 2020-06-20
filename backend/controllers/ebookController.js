const ebook = require('../models/ebookModel')
exports.getebook = async(req,res)=>{
    res.json({"msg":"All ebook"})
}

exports.saveebook = async(req,res)=>{
    const {description,file} = req.body
    //validate the data
    //upload the file to the server
    //save the file path of the server to the mongodb
    
    res.json({"msg":"Save successfully"})
}