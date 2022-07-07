const { createUser } = require("../controllers/user");
var express = require("express");
var jwt = require("jsonwebtoken");
var UserModel = require("../models/user");

router.post("/register", createUser);
router.post("/login", async (req, res, next) => {
    try{
        const { username, password, email } = req.body; 
        const conditions = !!username ? { username: username } : { email: email }; // username is defined by either username or email
        const user = await UserModel.findOne({ conditions });
        if (!user)
            return res.status(400).send({
                message: "User not found",
            });

        const validPassword = await user.isValidPassword(password);
        if (!validPassword)
            return res.status(400).send({
                message: "Invalid password",
            });
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign(
            { user: body },
            process.env.JWT_SECRET || "TOP_SECRET"
        );
        return res.json({ token });
    }catch (err) {
    next (err);
    }
});

module.exports = router;