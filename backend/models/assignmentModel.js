const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const assignmentSchema = new mongoose.Schema(
  {
    courseID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    file: {
      type: String,
    },
    submissions: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "AssignSubn" }],
      default: [],
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

//Export the model
module.exports = mongoose.model("Assignment", assignmentSchema);
