const passport = require("passport");
const router = require("express").Router();

const userRouter = require('./user');
const groupRouter = require('./group');
const authRouter = require('./auth');

router.use(authRouter);
router.use(passport.authenticate("jwt", { session: false }));
router.use("/users", userRouter);
router.use("/groups", groupRouter);

module.exports = router;