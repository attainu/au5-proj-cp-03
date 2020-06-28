const cloudinary = require("cloudinary");
require("dotenv").config({ path: "./config.env" });

cloudinary.config({
  cloud_name: "codingamrit",
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = cloudinary;
