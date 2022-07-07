require("./auth/auth");

require("./database/config");

const baseRouter = require("./routers/base");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const errorHandler = require("./utils/errorHandler");

const app = express();

// Middlewares
app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Route middlewares
app.use('/api', baseRouter);

// custom error handlers ultimo app.use
app.use(errorHandler);

module.exports = app;