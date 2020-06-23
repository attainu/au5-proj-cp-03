const mongoose = require('mongoose');
const AppError = require('./../controllers/errorController');
const e = require('express');

// Declare the Schema of the Mongo model
var quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    question: [{
        question: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        options: {
            type: [String],
            validate: [optionsMinLen, 'Atleast 2 options should be presnt for a quiz']
        },
        answer: {
            type: String,
            required: true,
            trim: true,
        }
    }]
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

function optionsMinLen(val) {
    return val.length >= 2;
}

quizSchema.methods.duplicateQuestion = async function (question, questions) {
    return questions.some(el => el.question === question);
}

quizSchema.methods.deleteQuestion = async function (question, questions) {
    for (let i = 0; i < questions.length; i++) {
        if (questions[i].question === question)
            return i;
    }
}


//Export the model
module.exports = mongoose.model('Quiz', quizSchema);