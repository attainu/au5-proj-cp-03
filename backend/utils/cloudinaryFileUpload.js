const fs = require("fs");
// eslint-disable-next-line node/no-unpublished-require
const cloudinary = require("./cloudinary");
const AppError = require("./appError");

function uploadToCloudinary(image, next) {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(image, async function (err, response) {
      if (err) {
        return next(
          new AppError(`Error while uploading file, Please try again!`, 400)
        );
      }
      // eslint-disable-next-line no-shadow
      fs.unlink(image, function (err, res) {
        if (err) {
          // eslint-disable-next-line no-console
          console.log("Error!");
        }
      });
      resolve(response);
    });
  });
}

exports.uploadFile = (req, next) => {
  return new Promise((resolve) => {
    if (req.files) {
      const { file } = req.files;
      const fileName = Date.now() + file.name;
      file.mv(`../backend/public/files/${fileName}`, function (err) {
        if (err) {
          return next(
            new AppError(`Error while uploading file, Please try again!`, 400)
          );
        }
      });
      const response = uploadToCloudinary(
        `../backend/public/files/${fileName}`,
        next
      );
      response.then((res) => {
        resolve(res.secure_url);
      });
    } else resolve("");
  });
};
