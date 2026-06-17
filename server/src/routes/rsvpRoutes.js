const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const {createRSVP ,getAttendees ,updateRSVP ,deleteRSVP} = require("../controllers/rsvpController");

router.post("/:id/rsvp",
    protect,
    createRSVP
);

router.get("/:id/attendees",
    protect,
    getAttendees
);

router.put("/:id/rsvp",
    protect,
    updateRSVP
);

router.delete("/:id/rsvp",
    protect,
    deleteRSVP
);

module.exports = router;