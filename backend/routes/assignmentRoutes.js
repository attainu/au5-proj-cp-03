const express = require("express");

const router = express.Router();

const assignmentController = require("../controllers/assignmentController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(assignmentController.getAssignment)
  .post(
    authController.protect,
    authController.restrict("instructor"),
    assignmentController.createAssignment
  )
  .delete(
    authController.protect,
    authController.restrict("instructor"),
    assignmentController.deleteAssignment
  );
