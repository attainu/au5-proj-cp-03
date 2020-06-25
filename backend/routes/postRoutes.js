const express = require("express");
const fileUpload = require("express-fileupload");

const router = express.Router();
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");

router
  .route("/")
  .get(postController.getPost)
  .post(
    authController.protect,
    authController.restrict("instructor"),
    fileUpload(),
    postController.createPost
  )
  .put(
    authController.protect,
    authController.restrict("instructor"),
    fileUpload(),
    postController.updatePost
  )
  .delete(
    authController.protect,
    authController.restrict("instructor"),
    postController.deletePost
  );

module.exports = router;
