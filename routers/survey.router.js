const router = require('express').Router();
const { createSurvey, answerSurvey } = require('../controllers/survey/survey.controller');

router.post('/new', createSurvey);
router.post('/answer/:id', answerSurvey );

module.exports = router;