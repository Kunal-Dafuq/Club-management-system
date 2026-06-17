const express = require("express");
const router = express.Router();
const {allowRoles}=require("../middleware/roleMiddleware");
const {createEvent ,getEvents ,getEventById ,updateEvent ,deleteEvent}=require("../controllers/eventController");
const {protect}=require("../middleware/authMiddleware");

router.get(
    "/",
    protect,
    getEvents
);

router.get(
    "/:id",
    protect,
    getEventById
);

router.post(
    "/",
    protect,
    allowRoles(
        "SUPER_ADMIN",
        "COORDINATOR"
    ),
    createEvent
);

router.put(
    "/:id",
    protect,
    allowRoles(
        "SUPER_ADMIN",
        "COORDINATOR"
    ),
    updateEvent
);

router.delete(
    "/:id",
    protect,
    allowRoles(
        "SUPER_ADMIN",
        "COORDINATOR"
    ),
    deleteEvent
);

module.exports=router;