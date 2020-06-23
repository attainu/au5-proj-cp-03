const express = require('express')
const router = express.Router()

const quizController = require('../controllers/quizController');


router.post('/quiz', quizController.createQuiz);
router.delete('/quiz', quizController.deleteQuiz);
router.post('/question', quizController.addQuestion);
router.delete('/question', quizController.deleteQuestion);

module.exports = router
