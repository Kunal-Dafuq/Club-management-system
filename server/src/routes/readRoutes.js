const router=require("express").Router();

const {protect}=require("../middleware/authMiddleware");
const controller=require("../controllers/readController");

router.post(
    "/:messageId",
    protect,
    controller.markRead
);

module.exports=router;