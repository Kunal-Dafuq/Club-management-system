const express = require("express");
const router = express.Router();
const {allowRoles} = require("../middleware/roleMiddleware");
const {
    register,
    login ,
    getMe ,
    promoteUser
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");
const authLimiter = require("../middleware/authLimiter");

router.post(
    "/register",
    authLimiter,
    register
);

router.post(
    "/login",
    authLimiter,
    login
);

router.get(
    "/me",
    protect,
    getMe
);

router.put(
    "/promote",
    promoteUser
);

router.get(
  "/profile",
  protect,
  (req,res)=>{
    const {
      password: _password,
      ...safeUser
    } = req.user;

    res.json({
      message:"Protected route works",
      user:safeUser
    });
});

router.get(
    "/admin",
    protect,
    allowRoles("SUPER_ADMIN"),
    (req,res)=>{
    res.json({
        message:"Welcome admin"
    });
});

module.exports = router;