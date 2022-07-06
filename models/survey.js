const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const SurveySchema = new Schema(
    {



    },
);

const SurveyModel = mongoose.model("survey", SurveySchema);

module.exports = SurveyModel;