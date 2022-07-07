const Joi = require("@hapi/joi");

const option = Joi.object({
    text: Joi.string().required()
})

const question = Joi.object({
    title: Joi.string().required(),
    options: Joi.array().items(option).required()
})

const survey = Joi.object({
    questions: Joi.array().items(question).required(),
});

const answeredQuestion = Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required(),
})

const answeredSurvey = Joi.object({
    surveyId: Joi.string().required(),
    responses: Joi.array().items(answeredQuestion),
})

exports.survey = survey;
exports.option = option;
exports.question = question;

exports.answeredSurvey = answeredSurvey;