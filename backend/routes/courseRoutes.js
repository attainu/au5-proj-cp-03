const express = require("express");

const router = express.Router();
const { getcourses, createcourse } = require("../controllers/courseController");
//get list of courses
router.get("/getcourses", getcourses);
//create courses
router.post("/createcourse", createcourse);

module.exports = router;
