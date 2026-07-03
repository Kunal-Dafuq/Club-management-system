const workflow = {

    TODO: [
        "IN_PROGRESS"
    ],
    
    IN_PROGRESS: [
        "REVIEW",
        "TODO"
    ],

    REVIEW: [
        "COMPLETED",
        "IN_PROGRESS"
    ],

    COMPLETED: [
        "REVIEW"
    ]
};

module.exports = workflow;