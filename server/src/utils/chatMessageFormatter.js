module.exports = (message, membershipId) => {

    const reads = message.reads || [];
    return {
        ...message,

        isRead: reads.some(
            read => read.membershipId === membershipId
        ),

        readCount: reads.length,

        delivered:message.deliveredAt !== null ||
        reads.length > 0,

        readBy: reads.map(read => ({
            membershipId: read.membershipId,
            name: read.membership.user.name,
            userId: read.membership.user.id,
            readAt: read.readAt
        })),

        replyCount:message.replies?.length||0,

        reactionCount: message.reactions?.length || 0,

        attachmentCount: message.attachments?.length || 0,

        isPinned:!!message.pin
    };
};