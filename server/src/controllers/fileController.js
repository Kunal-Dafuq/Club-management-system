const asyncHandler = require("../middleware/asyncHandler");
const fileService = require("../services/fileService");

const uploadFile = asyncHandler(async (req, res) => {
    const file = await fileService.uploadFile(
        req.body,
        req.user
    );

    res.status(201).json({
        success: true,
        file
    });
});

const getFile = asyncHandler(async (req, res) => {
    const file = await fileService.getFile(Number(req.params.id));

    res.json({
        success: true,
        file
    });
});

const deleteFile = asyncHandler(async (req, res) => {
    await fileService.deleteFile(
        Number(req.params.id),
        req.user.id
    );

    res.json({
        success: true,
        message: "File deleted successfully."
    });
});

module.exports = {
    uploadFile,
    getFile,
    deleteFile
};