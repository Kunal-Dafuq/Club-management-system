const router=require("express").Router();

const auth=require("../middlewares/auth");
const controller=require("../controllers/searchController");

router.get(
    "/",
    auth,
    controller.search
);

module.exports=router;