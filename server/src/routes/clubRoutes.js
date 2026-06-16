const express = require("express");
const router = express.Router();

const {createClub ,getClubs ,getClubById ,updateClub ,deleteClub} = require("../controllers/clubController");
const {protect} = require("../middleware/authMiddleware");
const {allowRoles} = require("../middleware/roleMiddleware");

router.get(
    "/",
    getClubs
);

router.get(
    "/:id",
    getClubById
);

router.post(
    "/",
    protect,
    allowRoles("SUPER_ADMIN"),
    createClub
);

router.put(
    "/:id",
    protect,
    allowRoles("SUPER_ADMIN"),
    updateClub
);

router.delete(
    "/:id",
    protect,
    allowRoles("SUPER_ADMIN"),
    deleteClub
);

module.exports = router;