const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const reportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  classandsection: {
    type: String,
    required: true,
  },
  marks: {
    type: String,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("Report", reportSchema);
