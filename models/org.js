const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const OrgSchema = new Schema(
    {

    },
);

const OrgModel = mongoose.model("org", OrgSchema);

module.exports = OrgModel;

