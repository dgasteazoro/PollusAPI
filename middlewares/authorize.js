exports.authorizeAdmin = function(req, res, next) {
    const { user } = req;

    if (user.role != "admin")
        throw { status: 403, message: "Forbidden" };

    next();
}

exports.authorizeOrg = function(req, res, next) {
    const { user } = req;

    if (user.role != "admin" || user.role != "org")
    throw { status: 403, message: "Forbidden" };

    next();
}