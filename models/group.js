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
        // org
        // surveys: [{
        //     surveyId: String
        // }]
    },
    { timestamps: true }
);

// Create method addSurvey
// Create method removeSurvey

const GroupModel = mongoose.model("group", GroupSchema);

module.exports = GroupModel;