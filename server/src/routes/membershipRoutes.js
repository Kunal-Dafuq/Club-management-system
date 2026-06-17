const express = require("express");
const router = express.Router();
const {joinClub ,leaveClub ,getClubMembers ,getMyClubs}=require("../controllers/membershipController");
const {protect}=require("../middleware/authMiddleware");

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

module.exports=router;