const passport = require("passport");
const router = require("express").Router();

const userRouter = require('./user');
const groupRouter = require('./group');
const authRouter = require('./auth');
const surveyRouter = require('./survey.router');

router.use(authRouter);
router.use(passport.authenticate("jwt", { session: false }));
router.use("/users", userRouter);
router.use("/groups", groupRouter);
router.use("/surveys", surveyRouter);

module.exports = router;