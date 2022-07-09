const GroupModel = require('../models/group');
const UserModel = require('../models/user');
const HttpError = require('../utils/HttpError');

exports.createGroup = async (req, res, next) => {
    try {
        const group = new GroupModel(req.body);
        await group.save();
        await group
            .populate({
                path: 'groupLeader',
                populate: {
                    path: 'groups'
                },
            });

        return res.status(201).send(group);
    } catch (err) {
        next (err);
    };
};

exports.getGroup = async (req, res, next) => {
    try {
        const group = await GroupModel.findById(req.params.id);
        res.status(200).json(group);
    } catch (err) {
        next (err);
    };
};

exports.getAllGroups = async (req, res, next) => {
    try{
        const groups = await GroupModel.find({})
        res.send({
            count: groups.length,
            groups,
        });
    } catch (err) {
        next (err);
    };
};

exports.getMembers = async (req, res, next) => {
    try {
        if (req.params.id.length < 12)
            throw new HttpError(400, 'Wrong id format');

        return res.status(200).json(await UserModel.find({ groups: req.params.id }, '-password -groups -role'));
    } catch(err) {
        next(err);
    };
};
