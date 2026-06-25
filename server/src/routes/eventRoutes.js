const express = require("express");
const router = express.Router();
const {allowRoles}=require("../middleware/roleMiddleware");
const {createEvent ,getEvents ,getEventById ,updateEvent ,deleteEvent}=require("../controllers/eventController");
const {protect}=require("../middleware/authMiddleware");

router.get(
    "/",
    getEvents
);

router.get(
    "/:id",
    getEventById
);

router.post(
    "/",
    protect,
    allowRoles(
        "COORDINATOR",
        "SUPER_ADMIN"
    ),
    createEvent
);

router.put(
    "/:id",
    protect,
    allowRoles(
        "COORDINATOR",
        "SUPER_ADMIN"
    ),
    updateEvent
);

router.delete(
    "/:id",
    protect,
    allowRoles(
        "COORDINATOR",
        "SUPER_ADMIN"
    ),
    deleteEvent
);

module.exports=router;