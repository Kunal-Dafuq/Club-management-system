module.exports = (req, res, next) => {
    if (!req.file) {
        return next();
    }

    const { mimetype, size } = req.file;

    if (mimetype.startsWith("image/")) {
        if (size > 10 * 1024 * 1024) {
            return res.status(400).json({
                message: "Images cannot exceed 10 MB."
            });
        }
        return next();
    }

    if (mimetype.startsWith("video/")) {
        if (size > 100 * 1024 * 1024) {
            return res.status(400).json({
                message: "Videos cannot exceed 100 MB. Please use the resumable upload tool."
            });
        }
        return next();
    }

    if (size > 50 * 1024 * 1024) {
        return res.status(400).json({
            message: "Documents cannot exceed 50 MB."
        });
    }

    next();
};