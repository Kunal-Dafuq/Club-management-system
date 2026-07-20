const router = require("express").Router();

const { protect } = require("../middleware/authMiddleware");
const {canManageCommittee} = require("../middleware/permissionMiddleware");
const {
    createCommittee,
    getClubCommittees,
    getCommittee,
    updateCommittee,
    deleteCommittee,
    addCommitteeMember,
    removeCommitteeMember,
    updateCommitteeMemberRole,
    getCommitteeStatistics,
    restoreCommittee
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

router.patch(
    "/:id/restore",
    protect,
    canManageCommittee,
    restoreCommittee
);

module.exports = router;