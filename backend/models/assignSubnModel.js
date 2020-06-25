const mongoose = require("mongoose");

const assingSubnSchema = new mongoose.Schema({
  assignmentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("AssignSubn", assingSubnSchema);
