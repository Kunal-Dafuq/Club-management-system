const router=require("express").Router();

const {protect}=require("../middleware/authMiddleware");
const controller=require("../controllers/mediaController");

router.get(
    "/:roomId/images",
    protect,
    controller.getMedia
);

router.get(
    "/:roomId/files",
    protect,
    controller.getFiles
);

module.exports=router;
