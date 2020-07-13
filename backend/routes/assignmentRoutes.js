const express = require("express");

const router = express.Router();

const assignmentController = require("../controllers/assignmentController");
const authController = require("../controllers/authController");

router.get("/:id", authController.protect, assignmentController.allAssignments);

router
  .route("/")
  .get(authController.protect, assignmentController.getAssignment)
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

module.exports = router;
