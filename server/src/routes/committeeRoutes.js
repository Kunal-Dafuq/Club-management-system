const router = require("express").Router();

const { protect } = require("../middleware/authMiddleware");

const {
    createCommittee,
    getClubCommittees,
    getCommittee,
    updateCommittee,
    deleteCommittee,
    addCommitteeMember,
    removeCommitteeMember,
    updateCommitteeMemberRole,
    getCommitteeStatistics
} = require("../controllers/committeeController");

router.post(
    "/club/:clubId",
    protect,
    createCommittee
);

router.get(
    "/club/:clubId",
    protect,
    getClubCommittees
);

router.get(
    "/:id",
    protect,
    getCommittee
);

router.patch(
    "/:id",
    protect,
    updateCommittee
);

router.delete(
    "/:id",
    protect,
    deleteCommittee
);

router.post(
    "/:committeeId/members",
    protect,
    addCommitteeMember
);

router.delete(
    "/:committeeId/members/:membershipId",
    protect,
    removeCommitteeMember
);

router.patch(
    "/members/:id/role",
    protect,
    updateCommitteeMemberRole
);

router.get(
    "/:id/stats",
    protect,
    getCommitteeStatistics
);

const {
    canManageCommittee,
    canDeleteCommittee
} = require("../middleware/permissionMiddleware");

router.patch(
    "/:id",
    protect,
    canManageCommittee,
    updateCommittee
);

router.delete(
    "/:id",
    protect,
    canDeleteCommittee,
    deleteCommittee
);

router.post(
    "/:committeeId/members",
    protect,
    canManageCommittee,
    addCommitteeMember
);

router.delete(
    "/:committeeId/members/:membershipId",
    protect,
    canManageCommittee,
    removeCommitteeMember
);

router.patch(
    "/members/:id/role",
    protect,
    canManageCommittee,
    updateCommitteeMemberRole
);

module.exports = router;