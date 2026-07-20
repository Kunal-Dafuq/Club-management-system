const asyncHandler = require("../middleware/asyncHandler");

const exportService = require("../services/exportService");
const auditLogger = require("../utils/auditLogger");

const exportClub = asyncHandler(async (req, res) => {
    const report = await exportService.exportClub(
        Number(req.params.clubId)
    );

    await auditLogger(req, {
        action: "CLUB_EXPORT",
        entityType: "Club",
        entityId: Number(req.params.clubId)
    });

    res.json({
        success: true,
        report
    });
});

const exportCommittee = asyncHandler(async (req, res) => {
    const report = await exportService.exportCommittee(
        Number(req.params.committeeId)
    );

    res.json({
        success: true,
        report
    });
});

const exportEvent = asyncHandler(async (req, res) => {
    const report = await exportService.exportEvent(
        Number(req.params.eventId)
    );

    res.json({
        success: true,
        report
    });
});

module.exports = {
    exportClub,
    exportCommittee,
    exportEvent
};