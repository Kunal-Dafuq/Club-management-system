module.exports = (req, clubId) => {

    const membershipId =
        req.user.membershipMap[clubId];

    if (!membershipId) {
        throw new Error("Membership not found");
    }

    return membershipId;

};