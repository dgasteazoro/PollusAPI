const { SurveyModel, AnsweredSurveyModel } = require("../../models/survey.model");
const { survey, answeredSurvey } = require("./survey.validator")

exports.createSurvey = async (req, res, next) => {
    const { user } = req;

    const validate = await survey.validateAsync(req.body);

    const newSurvey = new SurveyModel({
        questions: req.body.questions,
        createdBy: user,
    });

    await newSurvey.save();

    return res.status(201).json(newSurvey);
}

exports.answerSurvey = async (req, res, next) => {
    const { user } = req;
    const { id } = req.params;
    const { questions } = await SurveyModel.findOne({ _id: id });

    const body = {
        surveyId: id,
        ...req.body,
        answeredBy: user._id,
    }

    const validate = await answeredSurvey.validateAsync({
        surveyId: id,
        ...req.body,
    });

    const { responses } = body;

    const mappedResponses = responses.map((resp) => {
        const quest = getQuestion(questions, resp.question);
        const ans = getAnswer(quest.options, resp.answer);

        return {
            question: quest.title,
            answer: ans.text
        }
    })

    const newAnsweredSurvey = new AnsweredSurveyModel({
        ...body,
        responses: mappedResponses
    });

    await newAnsweredSurvey.save();

    return res.status(201).json(newAnsweredSurvey);
}

exports.deleteSurvey = async (req, res, next) => {
    const { id } = req.params;

    const deletedSurveys = await SurveyModel.delete({ _id: id });
    const deletedAnsweredSurveys = await AnsweredSurveyModel.delete({ surveyId: id });

    return res.status(204).json({ deletedSurveys, deletedAnsweredSurveys })
}

const getQuestion = (questions, id) => questions.find((q) => q._id == id);

const getAnswer = (answers, id) => answers.find((a) => a._id == id);

exports.getSurvey = async (req, res, next) => {
    try {
        const survey = await SurveyModel.findById(req.params.id);
        res.status(200).json(survey);
    } catch (err) {
        next (err);
    }
};

exports.getAllSurveys = async (req, res, next) => {
    try {
        const surveys = await SurveyModel.find({});
        res.send({
            count: surveys.length,
            surveys,
        });
    } catch (err) {
        next (err);
    };
};

exports.getAllAnsweredSurveys = async (req, res, next) => {
    try {
        const answSurveys = await AnsweredSurveyModel.find({});
        res.send({
            count: answSurveys.length,
            answSurveys,
        });
    } catch (err) {
        next (err);
    };
}; 