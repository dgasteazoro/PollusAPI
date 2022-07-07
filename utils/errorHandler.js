module.exports = (err, req, res, next) => {
    // If duplicate key error
    if (err.code == 11000) {
        return res.status(400).send({
            message: "Duplicate key",
        });
    }
    // Mongoose model
    if (err.errors) {
        var detailErrors = [];
        Object.values(err.errors).map(({ message, kind, path, value }) => {
            detailErrors.push({ message, kind, path, value });
        });

        return res.status(400).send({
            message: "Constraint error. See errors array for details.",
            errors: detailErrors,
        });
    }
    next(err);
};