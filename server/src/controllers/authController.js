const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");
const generateToken = require("../utils/generateToken");
const auditLogger = require("../utils/auditLogger");
const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");

const register = asyncHandler(async (req, res) => {
    const {
      name,
      email,
      password,
      department
    } = req.body;

    if (!name?.trim() || !email?.trim() || !password
    ) {
      throw new ApiError(
        400,
        "Name, email and password are required."
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (existingUser) {
      throw new ApiError(
        409,
        "User already exists."
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        department,
        role: "MEMBER"
      }
    });

    await auditLogger(req,{
        action:"USER_REGISTERED",
        entityType:"User",
        entityId:user.id,
        description:`${user.name} registered`
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: {
          id: user.id,
          name: user.name,
          email: user.email,
          department: user.department,
          role: user.role
        }
    });
});

const login = asyncHandler(async (req, res) => {
    const {
      email,
      password
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      throw new ApiError(
        401,
        "Invalid email or password."
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new ApiError(
        401,
        "Invalid email or password."
      );
    }

    const token = generateToken(
      user.id
    );

    await auditLogger(req,{
        action:"USER_LOGIN",
        entityType:"User",
        entityId:user.id,
        description:`${user.name} logged in`
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        department: user.department,
        role: user.role
      }
    });
});

const promoteUser = asyncHandler(async (req, res) => {
    const {
      email,
      role
    } = req.body;

    if(
      !email || !role
    ){
      return res.status(400).json({
        message:"Email and role required"
      });
    }

    const allowedRoles=[
      "MEMBER",
      "COORDINATOR",
      "SUPER_ADMIN"
    ];

    if(!allowedRoles.includes(role)){
      return res.status(400).json({
        message:"Invalid role"
      });
    }

    if(!existingUser){
      throw new ApiError(
        404,
        "User not found."
      );
    }

    await auditLogger(req,{
        action:"USER_PROMOTION",
        entityType:"User",
        entityId:user.id,
        description:`${user.name} has been promoted`
    });

    res.json({
      message:"Role updated",
      user:{
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role
      }
    });
});

const logout = asyncHandler(async (req, res) => {
    await auditLogger(req,{
        action:"USER_LOGOUT",
        entityType:"User",
        entityId:req.user.id,
        description:"User logged out"
    });

    res.json({
        message:"Logged out"
    });
});

module.exports = {
  register,
  login ,
  promoteUser,
  logout
};