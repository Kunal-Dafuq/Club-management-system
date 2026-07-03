const validateTask = (data) => {
    if (!data.title?.trim()) {
        throw new Error("Task title is required");
    }

    if (data.title.length > 120) {
        throw new Error(
            "Task title too long"
        );
    }

    return true;

};

module.exports = validateTask;