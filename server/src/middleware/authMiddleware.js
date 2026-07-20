const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Not authorized"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id
      },

      include:{
        memberships:{
          select:{
            id:true,
            clubId:true,
            status:true,
            role: true
          }
        }
      }
    });

    if (!user) {
        return res.status(401).json({
            message: "User not found"
        });
    }

    const membershipMap = {};

    user.memberships
        .filter(
            membership =>
                membership.status === "APPROVED"
        )
        .forEach(membership => {
            membershipMap[membership.clubId] = membership.id;
        });

    user.membershipMap = membershipMap;

    req.user = user;

    const activeClubId = Number(req.headers["x-club-id"]);

    if(activeClubId){
      const membership =
        user.memberships.find(
          m=>
              m.clubId===activeClubId &&
              m.status==="APPROVED"
        );

      req.membership=
        membership || null;
    }

    next();

  } catch(err){
    if(err.name==="TokenExpiredError"){
      return res.status(401).json({
        message:"Token expired"
      });
    }

    return res.status(401).json({
      message:"Invalid token"
    });
  }
};

module.exports = {
  protect
};