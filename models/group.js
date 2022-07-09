const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const GroupSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },        
        groupLeader: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        org: {
            type: Schema.Types.ObjectId, ref: 'org'
        },
        surveys: [{
            type: Schema.Types.ObjectId, ref: 'survey'
        }],
    },
    { timestamps: true }
);

GroupSchema.methods.addSurvey = async function (surveyId) {
    const group = this;

    const belongsToGroup = group.surveys.some((it) => it === surveyId);

    if (belongsToGroup)
        return null;

    group.surveys.push(surveyId);
    
    return group.surveys;
}

GroupSchema.methods.removeSurvey = async function (surveyId) {
    const group = this;

    const belongsToGroup = group.surveys.some((it) => it === surveyId);

    if (!belongsToGroup)
        return false;

    group.surveys = group.surveys.filter((it) => it !== surveyId);
    
    return true;
}

const GroupModel = mongoose.model("group", GroupSchema);

module.exports = GroupModel;