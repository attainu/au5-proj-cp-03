const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
// SET STORAGE
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
//const storage = multer.memoryStorage(); <--- for memory dst
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "lectures",
    resource_type: "video",
    public_id: function (req, file) {
      const publicid = file.originalname.replace(/\.[^/.]+$/, "");
      console.log(publicid);
      return publicid;
    },
    phash: true,
    use_filename: true,
  },
});
const upload = multer({ storage: storage });
module.exports = upload;
