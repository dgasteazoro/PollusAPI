const UserModel = require("../models/user");
const { registerSchema } = require("../middlewares/validation");

exports.createUser = async (req, res, next) => {
    try {
        let result = await registerSchema.validateAsync(req.body);

        let user = new UserModel(req.body);

        let savedUser = await user.save();

        return res.status(201).send(savedUser);
    } catch (err) {
    if (err.isJoi === true) err.status = 400;    
        next(err);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const username = req.params.username;
        const user = await UserModel.findOne({ username }, "-password");
        if (!user) {
            return res.status(404).send({
                message: "User not found",
            });
        }
        console.log(user);
        res.send({ user });
    } catch (err) {
        next(err);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find({}, "-password").populate('groups');
        res.send({
            count: users.length,
            users,
        });
    }catch (err) {
    next(err);
    }
};

/* exports.updateUser = async (req, res, next) => {
    try{
        const usernameToUpdate = req.params.username;
        const { name, lastName, groups} = req.body;
        const user = await UserModel.findOne({ username: usernameToUpdate});

        if (!user) 
        return res.status(400).send({
            message: "User not found",
        });

        user.name = name;
        user.lastName = lastName;
        user.groups = groups;

        const updateUser = await user.save();

        if (user == updateUser) {
            return res.send({
                message: "User has been updated",
                user: { username, name, lastName, email: user.email},
            });
        }
        res.send({
            message: "Cannot update user",
        });
    }catch (err) {
    next(err);
    }
}; */

exports.deleteUser = async (req, res, next) => {
    try {
        const username = req.params.username;
        const { deletedCount } = await UserModel.deleteOne({ username });
        if (deletedCount == 1) {
            return res.send({
                message: "User has been deleted",
            });
        }
        return res.status(400).send({
            message: "Cannot delete user",
        });
    } catch (err) {
        next (err);
    }
};

exports.addGroup = async (req, res, next) => {
    const { user } = req;
    const { id } = req.params;
    
    user.addGroup(id);
    await user.save();

    const fullUser = await UserModel.findOne({ _id: user._id }).populate('groups');

    return res.status(200).send(fullUser);
}

exports