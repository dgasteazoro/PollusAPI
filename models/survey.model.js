const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AnsweredQuestionSchema = new Schema({
    question: { type: Schema.Types.ObjectId, ref: 'question' },
    answer: { type: Schema.Types.ObjectId, ref: 'option' }
})

const OptionsSchema = new Schema({
    text: String,
});

const QuestionSchema = new Schema({
    title: String,
    options: [OptionsSchema]
});

// Google form
const SurveySchema = new Schema(
    {
        questions: [QuestionSchema],
        createdby: { type: Schema.Types.ObjectId, ref: 'user' }
    },
);

// Una respuesta del google form [] -> Todas las respiuestas
// ASS.find({ surveyId: id })
const AnsweredSurveySchema = new Schema({
    survey: { type: Schema.Types.ObjectId, ref: 'survey' },
    responses: [{ 
        question: String,
        answer: String,
    }],
    answeredBy: { type: Schema.Types.ObjectId, ref: 'user' }
});

const SurveyModel = mongoose.model("survey", SurveySchema);
const AnsweredQuestionModel = mongoose.model("answeredquestion", AnsweredQuestionSchema);
const QuestionModel = mongoose.model("question", QuestionSchema);
const OptionsModel = mongoose.model("option", OptionsSchema);
const AnsweredSurveyModel = mongoose.model("answeredsurvey", AnsweredSurveySchema);

exports.SurveyModel = SurveyModel;
exports.AnsweredQuestionModel = AnsweredQuestionModel;
exports.QuestionModel = QuestionModel;
exports.OptionsModel = OptionsModel;
exports.AnsweredSurveyModel = AnsweredSurveyModel;