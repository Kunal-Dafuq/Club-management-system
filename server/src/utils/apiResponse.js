exports.success = (
    res,
    data = null,
    message = "Success",
    status = 200
) => {
    return res.status(status).json({
        success: true,
        message,
        data
    });
};

exports.created = (
    res,
    data,
    message = "Created successfully"
) => {
    return res.status(201).json({
        success: true,
        message,
        data
    });
};