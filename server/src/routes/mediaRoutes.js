const router=require("express").Router();

const auth=require("../middlewares/auth");
const controller=require("../controllers/mediaController");

router.get(
    "/:roomId/images",
    auth,
    controller.getMedia
);

router.get(
    "/:roomId/files",
    auth,
    controller.getFiles
);

module.exports=router;
