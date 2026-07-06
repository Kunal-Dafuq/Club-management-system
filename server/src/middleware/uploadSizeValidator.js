module.exports = (req, res, next) => {

    if (!req.file) {
        return next();
    }

    const { mimetype, size } = req.file;

    // Images → 2 GB
    if (mimetype.startsWith("image/")) {
        if (size > 2 * 1024 * 1024 * 1024) {
            return res.status(400).json({
                message: "Images cannot exceed 2 GB."
            });
        }

        return next();
    }

    // Videos → 5 GB
    if (mimetype.startsWith("video/")) {
        if (size > 5 * 1024 * 1024 * 1024) {
            return res.status(400).json({
                message: "Videos cannot exceed 5 GB."
            });
        }

        return next();
    }

    // Documents → 1 GB
    if (size > 1024 * 1024 * 1024) {
        return res.status(400).json({
            message: "Documents cannot exceed 1 GB."
        });
    }

    next();

};