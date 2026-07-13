const meetingService = require("../services/meetingService");
const auditLogger = require("../utils/auditLogger");

const createMeeting = async (
    req,
    res
) => {
    try {
        const meeting =
            await meetingService.createMeeting(
                Number(
                    req.params.committeeId
                ),
                req.user.membershipId,
                req.body
            );

        res.status(201).json({
            success: true,
            meeting
        });
    }

    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

const getCommitteeMeetings = async (req, res) => {
    try {
        const meetings = await meetingService.getCommitteeMeetings(
            Number(req.params.committeeId)
        );

        res.json(meetings);

    }

    catch (err) {

        res.status(400).json({
            message: err.message
        });
    }
};

const getMeeting = async (req, res) => {
    try {
        const meeting = await meetingService.getMeeting(
            Number(req.params.id)
        );

        res.json(meeting);

    }

    catch (err) {

        res.status(400).json({
            message: err.message
        });
    }
};

const updateMeeting = async (req, res) => {
    try {
        const meeting = await meetingService.updateMeeting(
            Number(req.params.id),
            req.body
        );

        res.json(meeting);

    }

    catch (err) {

        res.status(400).json({
            message: err.message
        });
    }
};

const deleteMeeting = async (req, res) => {
    try {
        await meetingService.deleteMeeting(
            Number(req.params.id)
        );

        res.json({
            message: "Meeting deleted"
        });
    }

    catch (err) {

        res.status(400).json({
            message: err.message
        });
    }
};

const markAttendance = async (req, res) => {
    try {
        const attendance =
            await meetingService.markAttendance(
                Number(req.params.id),
                Number(req.body.membershipId),
                req.body.status
            );

        res.json(attendance);

    }

    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

await meetingService.restoreMeeting(id);

await auditLogger(req,{
    action:"MEETING_RESTORED",
    entityType:"Meeting",
    entityId:id
});

module.exports = {
    createMeeting,
    getCommitteeMeetings,
    getMeeting,
    updateMeeting,
    deleteMeeting,
    markAttendance
};