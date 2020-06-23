const express = require("express");

const router = express.Router();

const quizController = require("../controllers/quizController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(quizController.getQuiz)
  .post(
    authController.protect,
    authController.restrict("instructor"),
    quizController.createQuiz
  )
  .delete(
    authController.protect,
    authController.restrict("instructor"),
    quizController.deleteQuiz
  )
  .put(
    authController.protect,
    authController.restrict("instructor"),
    quizController.updateQuiz
  );

router
  .route("/question")
  .post(
    authController.protect,
    authController.restrict("instructor"),
    quizController.addQuestion
  )
  .delete(
    authController.protect,
    authController.restrict("instructor"),
    quizController.deleteQuestion
  );

module.exports = router;
