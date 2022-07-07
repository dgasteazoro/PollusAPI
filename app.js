var passport = require("passport");
require("./auth/auth");

require("./database/config");

var authRouter = require("./routers/auth");
var userRouter = require("./routers/user");

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var helmet = require("helmet");

var app = express();

// Middlewares
app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Route middlewares
app.use("/api/");
app.use(authRouter);
app.use(passport.authenticate("jwt", { session: false }));
app.use("/users", userRouter);

module.exports = app;