const express = require("express");

const router = express.Router();

const assignSubnController = require("../controllers/assignSubnController");
const authController = require("../controllers/authController");

router.get("/:id", authController.protect, assignSubnController.getAssignment);

router.post(
  "/",
  authController.protect,
  authController.restrict("student"),
  assignSubnController.assingmentSubn
);

module.exports = router;
