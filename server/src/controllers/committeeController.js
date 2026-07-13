const committeeService = require("../services/committeeService");
const auditLogger = require("../utils/auditLogger");

const createCommittee = async (req, res) => {
    try {
        const clubId = Number(req.params.clubId);
        const committee = await committeeService.createCommittee(
            clubId,
            req.body
        );

        await auditLogger(req,{
            action:"COMMITTEE_CREATED",
            entityType:"Committee",
            entityId:committee.id,
            description:`Created committee "${committee.name}"`,
            clubId:committee.clubId
        });

        res.status(201).json({
            committee
        });
    }

    catch (error) {
        console.log(error);
        res.status(500).json({

            message: "Server error."

        });
    }
};

const getClubCommittees = async (req, res) => {
    try {
        const committees = await committeeService.getCommitteesByClub(
            Number(req.params.clubId)
        );

        res.json(committees);

    }

    catch (error) {
        console.log(error);
        res.status(500).json({

            message: "Server error."

        });
    }
};

const getCommittee = async (req, res) => {
    try {
        const committee = await committeeService.getCommitteeById(
            Number(req.params.id)
        );

        if (!committee) {
            return res.status(404).json({

                message: "Committee not found."

            });
        }

        res.json(committee);

    }

    catch (error) {
        console.log(error);
        res.status(500).json({

            message: "Server error."

        });
    }
};

const updateCommittee = async (req, res) => {
    try {
        const committee = await committeeService.updateCommittee(
            Number(req.params.id),
            req.body
        );

        await auditLogger(req,{
            action:"COMMITTEE_ROLE_CHANGED",
            entityType:"CommitteeMember",
            entityId:committeeMember.id,
            description:`Committee role changed to ${committeeMember.role}`
        });

        res.json({
            committee
        });
    }

    catch (error) {
        console.log(error);
        res.status(500).json({

            message: "Server error."

        });
    }
};

const deleteCommittee = async (req, res) => {
    try {
        await committeeService.deleteCommittee(
            Number(req.params.id)
        );

        res.json({

            message: "Committee deleted successfully."

        });
    }

    catch (error) {
        console.log(error);
        res.status(500).json({

            message: "Server error."
        
        });
    }
};

const addCommitteeMember = async (req, res) => {
    try {
        const committee = await committeeService.addMember(
            Number(req.params.committeeId),
            req.body.membershipId,
            req.body.role
        );

        res.status(201).json({

            message: "Member added.",

            committee
        });
    }

    catch (error) {
        console.log(error);
        res.status(500).json({

            message: "Server error"

        });
    }
};

const removeCommitteeMember = async (req, res) => {
    try {
        await committeeService.removeMember(
            Number(req.params.committeeId),
            Number(req.params.membershipId)
        );
        res.json({

            message: "Member removed."
        });
    }

    catch (error) {
        console.log(error);
        res.status(500).json({

            message: "Server error"
        });
    }
};

const updateCommitteeMemberRole = async (req, res) => {
    try {
        const member = await committeeService.updateCommitteeRole(
            Number(req.params.id),
            req.body.role
        );

        res.json(member);

    }

    catch (error) {
        console.log(error);
        res.status(500).json({

            message: "Server error"
        });
    }
};

const getCommitteeStatistics = async (req, res) => {
    try {
        const stats = await committeeService.getCommitteeStats(
            Number(req.params.id)
        );

        res.json(stats);

    }

    catch (error) {
        console.log(error);
        res.status(500).json({

            message: "Server error"
        });
    }
};

await committeeService.restoreCommittee(id);

await auditLogger(req,{
    action:"COMMITTEE_RESTORED",
    entityType:"Committee",
    entityId:id
});

module.exports = {
    createCommittee,
    getClubCommittees,
    getCommittee,
    updateCommittee,
    deleteCommittee,
    addCommitteeMember,
    removeCommitteeMember,
    updateCommitteeMemberRole,
    getCommitteeStatistics
};