const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var quizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    question: {
        type: String,
        required: true,
        unique: true,
    },
    optionA: {
        type: String,
        required: true,
        unique: true,
    },
    optionB: {
        type: String,
        required: true,
        unique: true
    },
    optionC: {
        type: String,
        required: true,
        unique: true
    },
    optionD: {
        type: String,
        required: true,
        unique: true
    },
    answer: {
        type: String,
        required: true
    }
});

//Export the model
module.exports = mongoose.model('Quiz', quizSchema);