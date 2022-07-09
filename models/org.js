const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrgSchema = new Schema({
        name : {
            type: String,
            required: true,
        },
        purpose: {
            type: String,
            enum: ["NGO", "Gov", "Business", "Undeclared"],
            default: "Undeclared",
            required: true,
        }
    },
    { timestamps: true }
);

const OrgModel = mongoose.model("org", OrgSchema);

module.exports = OrgModel;
