const allowRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.membership || !roles.includes(req.membership.role)) {
            return res.status(403).json({
                success: false,
                message: "Access denied."
            });
        }

        next();
    };
};

module.exports = {
    allowRoles
};