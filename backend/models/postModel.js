const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const postSchema = new mongoose.Schema({
  instructorname: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  file: {
    type: String,
  },
});

//Export the model
module.exports = mongoose.model("Post", postSchema);
