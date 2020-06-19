const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var reportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true

    },
    marks: {
        type: String,
        required: true
    }
});

//Export the model
module.exports = mongoose.model('User', userSchema);