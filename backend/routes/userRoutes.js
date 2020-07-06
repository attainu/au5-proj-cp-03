const express = require("express");

const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router
  .route("/course")
  .post(
    authController.protect,
    authController.restrict("student"),
    userController.addStudentToCourse
  )
  .delete(
    authController.protect,
    authController.restrict("instructor"),
    userController.removeStudentFromCourse
  );

router.route("/").get(authController.protect, userController.getUser);

module.exports = router;
