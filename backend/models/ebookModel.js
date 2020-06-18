const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var ebookSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
        
    },
    file:{
        type:String,
        required:true,
        unique:true,
    }
});

//Export the model
module.exports = mongoose.model('Ebook', ebookSchema);