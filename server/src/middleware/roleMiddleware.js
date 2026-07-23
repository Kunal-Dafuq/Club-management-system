const allowRoles = (...roles) => {
    return (req, res, next) => {
        const hasGlobalRole = req.user && roles.includes(req.user.role);
        const hasClubRole = req.membership && roles.includes(req.membership.clubRole);

        if (!hasGlobalRole && !hasClubRole) {
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