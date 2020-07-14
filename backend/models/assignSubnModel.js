const mongoose = require("mongoose");

const assingSubnSchema = new mongoose.Schema({
  assignmentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
  },
  totalMarks: {
    type: Number,
  },
});

module.exports = mongoose.model("AssignSubn", assingSubnSchema);
