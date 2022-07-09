const router = require('express').Router();
const { createSurvey, 
answerSurvey, 
getSurvey, 
getAllSurveys, 
getAllAnsweredSurveys } = require('../controllers/survey/survey.controller');

router.post('/new', createSurvey);
router.post('/answer/:id', answerSurvey );

router.get("/:id", getSurvey);
router.get("/", getAllSurveys);
router.get("/", getAllAnsweredSurveys);

module.exports = router;