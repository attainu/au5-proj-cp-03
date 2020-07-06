const express = require("express");

const router = express.Router();
const courseController = require("../controllers/courseController");
const authController = require("../controllers/authController");

router.get("/:id", courseController.getcourse);

router
  .route("/")
  .post(
    authController.protect,
    authController.restrict("instructor"),
    courseController.createcourse
  )
  .put(
    authController.protect,
    authController.restrict("instructor"),
    courseController.updateCourse
  );

module.exports = router;
