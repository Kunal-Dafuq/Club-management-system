const reportService = require("./reportService");

const exportClub = async (clubId) => {
    return await reportService.generateClubReport(
        clubId
    );
};

const exportCommittee = async (committeeId) => {
    return await reportService.generateCommitteeReport(
        committeeId
    );
};

const exportEvent = async (eventId) => {
    return await reportService.generateEventReport(
        eventId
    );
};

module.exports = {
    exportClub,
    exportCommittee,
    exportEvent
};