const express = require("express");
const router = express.Router();
const {joinClub, leaveClub, getClubMembers, getMyClubs, approveMember, rejectMember, promoteMember, getPendingRequests, getCommittee, getClubAnalytics} = require("../controllers/membershipController");
const {protect, allowRoles} = require("../middleware/authMiddleware");

router.get(
    "/my-clubs",
    protect,
    getMyClubs
);

router.post(
    "/:id/join",
    protect,
    joinClub
);

router.delete(
    "/:id/leave",
    protect,
    leaveClub
);

router.get(
    "/:id/members",
    protect,
    getClubMembers
);

router.get(
    "/club/:id/pending",
    protect,
    allowRoles(
        "COORDINATOR",
        "SUPER_ADMIN"
    ),
    getPendingRequests
);

router.get(
    "/committee/:id",
    protect,
    getCommittee
);

router.get(
    "/club/:id/analytics",
    protect,
    getClubAnalytics
);

router.put(
    "/:id/approve",
    protect,
    allowRoles(
        "COORDINATOR",
        "SUPER_ADMIN"
    ),
    approveMember
);

router.put(
    "/:id/reject",
    protect,
    allowRoles(
        "COORDINATOR",
        "SUPER_ADMIN"
    ),
    rejectMember
);

router.put(
    "/:id/promote",
    protect,
    allowRoles(
        "COORDINATOR",
        "SUPER_ADMIN"
    ),
    promoteMember
);

module.exports=router;