const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const GroupSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },        
        groupLeader: {
            leaderId: String,
            username: String,
        },
        members: [{
            userId: String,
            username: String
        }],
        surveys: [{
            surveyId: String
        }]
    },
    { timestamps: true }
);

const GroupModel = mongoose.model("group", GroupSchema);

module.exports = GroupModel;