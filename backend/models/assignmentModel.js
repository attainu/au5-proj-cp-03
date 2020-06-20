const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var assignmentSchema = new mongoose.Schema({
    chapter:{
        type:String,
        required:true
    },
    date:{
        type:Date,   //check this value
        required:true,
        unique:true,
    },
    submissiondate:{
        type:Date,
        required:true,
        unique:true
    },
    file:{
        type:String, //path to file
        required:true,
    },
});

//Export the model
module.exports = mongoose.model('Assignment', assignmentSchema);