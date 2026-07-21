const committeeService = require("../services/committeeService");
const auditLogger = require("../utils/auditLogger");
const asyncHandler=require("../middleware/asyncHandler");
const ApiError=require("../utils/ApiError");

const createCommittee = asyncHandler(async (req, res) => {
    const clubId = Number(req.params.clubId);

    if (!clubId) {
        throw new ApiError(
            400,
            "Invalid club id."
        );
    }

    const committee = await committeeService.createCommittee(
        clubId,
        req.body
    );

    await auditLogger(req, {
        action: "COMMITTEE_CREATED",
        entityType: "Committee",
        entityId: committee.id,
        description: `Created committee "${committee.name}"`,
        clubId: committee.clubId
    });

    req.io
        ?.to(`club-${committee.clubId}`)
        .emit("committee-created", committee);

    res.status(201).json({
        success: true,
        committee
    });
});

const getClubCommittees = asyncHandler(async(req,res)=>{
        const committees = await committeeService.getCommitteesByClub(
            Number(req.params.clubId)
        );

        res.status(200).json({
            success: true,
            committees
        });
});

const getCommittee = asyncHandler(async(req,res)=>{
        const committee = await committeeService.getCommitteeById(
            Number(req.params.id)
        );

        if (!committee) {
            throw new ApiError(
                404,
                "Committee not found."
            );
        }

        res.json({
            success: true,
            committee
        });
});

const updateCommittee = asyncHandler(async(req,res)=>{
        const committee = await committeeService.updateCommittee(
            Number(req.params.id),
            req.body
        );

        await auditLogger(req,{
            action:"COMMITTEE_UPDATED",
            entityType:"Committee",
            entityId:committee.id,
            description:`Updated ${committee.name}`,
            clubId:committee.clubId
        });

        res.status(200).json({
            success: true,
            committee
        });
});

const deleteCommittee = asyncHandler(async(req,res)=>{
        const committee = await committeeService.deleteCommittee(
            Number(req.params.id),
            req.user.id
        );

        await auditLogger(req, {
            action: "COMMITTEE_DELETED",
            entityType: "Committee",
            entityId: committee.id,
            clubId: committee.clubId
        });

        res.json({
            success: true,
            message: "Committee deleted."
        });
});

const restoreCommittee = asyncHandler(async(req,res)=>{
        const committee = await committeeService.restoreCommittee(
            Number(req.params.id)
        );

        await auditLogger(req,{
            action:"COMMITTEE_RESTORED",
            entityType:"Committee",
            entityId:committee.id,
            clubId:committee.clubId
        });

        res.status(200).json({
            success: true,
            committee
        });
});

const addCommitteeMember = asyncHandler(async(req,res)=>{
        const committee = await committeeService.addMember(
            Number(req.params.committeeId),
            req.body.membershipId,
            req.body.role
        );

        await auditLogger(req,{
            action:"COMMITTEE_MEMBER_ADDED",
            entityType:"CommitteeMember",
            entityId:committee.id
        });

        res.status(201).json({
            message: "Member added.",
            committee
        });
});

const removeCommitteeMember = asyncHandler(async(req,res)=>{
        await committeeService.removeMember(
            Number(req.params.committeeId),
            Number(req.params.membershipId)
        );

        await auditLogger(req,{
            action:"COMMITTEE_MEMBER_REMOVED",
            entityType:"Committee"
        });

        res.json({
            message: "Member removed."
        });
});

const updateCommitteeMemberRole = asyncHandler(async(req,res)=>{
        const member = await committeeService.updateCommitteeRole(
            Number(req.params.id),
            req.body.role
        );

        await auditLogger(req,{
            action:"COMMITTEE_ROLE_CHANGED",
            entityType:"CommitteeMember",
            entityId:member.id,
            description:`Role changed to ${member.role}`
        });

        res.status(200).json({
            success: true,
            member
        });
});

const getCommitteeStatistics = asyncHandler(async(req,res)=>{
        const stats = await committeeService.getCommitteeStats(
            Number(req.params.id)
        );

        res.status(200).json({
            success: true,
            stats
        });
});

module.exports={
    createCommittee,
    getClubCommittees,
    getCommittee,
    updateCommittee,
    deleteCommittee,
    restoreCommittee,
    addCommitteeMember,
    removeCommitteeMember,
    updateCommitteeMemberRole,
    getCommitteeStatistics
};