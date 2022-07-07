const Joi = require("@hapi/joi");

// Register Validation
const registerSchema = Joi.object({
    username: Joi.string()
    .min(3)
    .required(),
    email: Joi.string()
        .required()
        .lowercase()
        .email(),
    name: Joi.string()
        .required(),
    lastName: Joi.string()
        .required(),
    password: Joi.string()
        .min(4)
        .required(),
    role: Joi.string()
        .required(),
    group: [Joi.string],
});

module.exports = { registerSchema };