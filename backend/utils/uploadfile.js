const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({


  cloudinary: cloudinary,
  params: {
    folder: "lectures",
    resource_type: "video",
    public_id: function (req, file) {
      console.log("Test:", file);

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
