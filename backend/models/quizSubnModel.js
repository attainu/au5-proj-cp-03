const mongoose = require("mongoose");

const quizSubnSchema = new mongoose.Schema({
  quizID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  questions: {
    type: Object,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("AssignSubn", quizSubnSchema);
