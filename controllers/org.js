const OrgModel = require("../models/org");

exports.createOrg = async (req, res, next) => {
    try {
    const org = new OrgModel(req.body);
    await org.save(); 
    
    return res.status(201).send(org);
    } catch (err) {
        next (err);
    }
};

exports.getOrg = async (req, res, next) => {
    try {
        const org = await OrgModel.findById(req.params.id);
        res.status(200).json(org);
    } catch (err) {
        next (err);
    };
};

exports.getAllOrgs = async (req, res, next) => {
    try {
        const orgs = await OrgModel.find({});
        res.status(200).send({
            count: orgs.length,
            orgs
        });
    } catch (err) {
        next (err);
    };
};

exports.updateOrg = async (req, res, next) => {
    try {
        const orgToUpdate = req.params.id;

        const { name, purpose } = req.body;
        console.log(req.body);
        const org = await OrgModel.findById(orgToUpdate);
        if (!org) return res.status(400).send({
            message: "Organization not found"
        })

        org.name = name;
        org.purpose = purpose;

        const updatedOrg = await org.save();

        if (org == updatedOrg) {
            return res.status(200).send({
                message: "Organization updated",
                org: updatedOrg,
            });
        }
        res.status(400).send({
            message: "Cannot update word",
        });
    } catch (err) {
        next (err);
    };
};

exports.deleteOrg = async (req, res, next) => {
    try {
        const org = req.params.id;
        const { deletedCount } = await OrgModel.deleteOne({ _id: org });
        if (deletedCount == 1) {
            return res.status(200).send({
                message: "Organization succesfully deleted",       
            });
        }
        return res.status(400).send({
            message: "Organization could not be deleted",
        });
    } catch (err) {
        next (err);
    };
};