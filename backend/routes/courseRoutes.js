const express = require("express");

const router = express.Router();
const { getcourses, createcourse } = require("../controllers/courseController");
const authController = require("../controllers/authController");
//get list of courses
router.get("/getcourses", getcourses);

router.post(
  "/createcourse",
  authController.protect,
  authController.restrict("instructor"),
  createcourse
);

module.exports = router;
