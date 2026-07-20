const reportService = require("../services/reportService");

const asyncHandler = require("../middleware/asyncHandler");
const auditLogger = require("../utils/auditLogger");

const generateClubReport = asyncHandler(async (req, res) => {
    const report =
        await reportService.generateClubReport(
            Number(req.params.clubId)
        );

    await auditLogger(req, {
        action: "CLUB_REPORT",
        entityType: "Club",
        entityId: Number(req.params.clubId)
    });

    res.json({
        success: true,
        report
    });
});

const generateEventReport = asyncHandler(async (req, res) => {
    const report =
        await reportService.generateEventReport(
            Number(req.params.eventId)
        );

    res.json({
        success: true,
        report
    });
});

const generateCommitteeReport = asyncHandler(async (req, res) => {
    const report =
        await reportService.generateCommitteeReport(
            Number(req.params.committeeId)
        );

    res.json({
        success: true,
        report
    });
});

module.exports = {
    generateClubReport,
    generateEventReport,
    generateCommitteeReport
};