const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var videoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    subject:{
        type:String,
        required:true,
        unique:true,
    },
    chapter:{
        type:String,
        required:true,
        unique:true,
    },
    file:{
        type:String,
        required:true,
    },
});

//Export the model
module.exports = mongoose.model('Video', videoSchema);