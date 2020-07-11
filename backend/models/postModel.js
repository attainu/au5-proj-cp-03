const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const postSchema = new mongoose.Schema(
  {
    courseID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    file: {
      type: String,
    },
    filename: {
      type: String,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
