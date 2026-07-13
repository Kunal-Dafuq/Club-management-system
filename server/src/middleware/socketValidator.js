function validateRoom(data) {
    if (!data) {
        throw new Error("Payload is required.");
    }

    if (!data.roomId) {
        throw new Error("roomId is required.");
    }

    if (isNaN(Number(data.roomId))) {
        throw new Error("Invalid roomId.");
    }
}

function validateMessage(data) {
    validateRoom(data);

    const hasContent =
        typeof data.content === "string" &&
        data.content.trim().length > 0;

    const hasAttachments =
        Array.isArray(data.attachments) &&
        data.attachments.length > 0;

    if (!hasContent && !hasAttachments) {
        throw new Error(
            "Message cannot be empty."
        );
    }
}

function validatePin(data) {

    validateRoom(data);

    if (!data.messageId) {
        throw new Error(
            "messageId is required."
        );
    }

    if (isNaN(Number(data.messageId))) {
        throw new Error(
            "Invalid messageId."
        );
    }
}

module.exports = {
    validateRoom,
    validateMessage,
    validatePin
};