const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");
const generateToken = require("../utils/generateToken");
const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      department
    } = req.body;

    //Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        department,
        role: "MEMBER"
      }
    });

    // Send safe response
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        department: user.department,
        role: user.role
      }
    });
  }

  catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

const login = async (req, res) => {
  try {
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
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = generateToken(
      user.id
    );

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
  }

  catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

const promoteUser = async (req,res)=>{
  try{
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

    if(
      !allowedRoles.includes(role)
    ){
      return res.status(400).json({
        message:"Invalid role"
      });
    }

    const user = await prisma.user.update({
      where:{email},
      data:{role}
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
  }

  catch(error){

    console.log(error);

    res.status(500).json({

      message:"Server error"

    });

  }

};

module.exports = {
  register,
  login ,
  promoteUser
};