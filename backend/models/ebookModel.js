const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const ebookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  filepath: {
    type: String,
    required: true,
    unique: true,
  },
});

//Export the model
module.exports = mongoose.model("Ebook", ebookSchema);
