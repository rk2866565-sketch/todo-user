import userSchema from "../models/userSchema.js";
import sessionSchema from "../models/sessionSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";
import { verifyMail } from "../emailverify/verifymail.js";



export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "userName, email and password are required",
      });
    }

    
    const existing = await userSchema.findOne({ email });

    if (existing) {
      return res.status(401).json({
        success: false,
        message: "User already Registered",
      });
    }

    
    const hashpassword = await bcrypt.hash(password, 10);

    
    const user = await userSchema.create({
      userName,
      email,
      password: hashpassword,
    });

    
    const token = jwt.sign(
      { userId: user._id },
      process.env.secretKey,
      {
        expiresIn: "5m",
      }
    );

   
    user.token = token;
    await user.save();

    
    try {
      await verifyMail(token, email);
    } catch (mailError) {
      console.error("Email sending failed:", mailError);
    }

    
    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: user,
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "User not Registered",
    });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    
    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    
    const passwordCheck = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordCheck) {
      return res.status(401).json({
        success: false,
        message: "Credentials Mismatch",
      });
    }

   
    if (user.isVerified !== true) {
      return res.status(400).json({
        success: false,
        message: "Please Verify first then login",
      });
    }

   
    await sessionSchema.findOneAndDelete({
      userId: user._id,
    });

  
    await sessionSchema.create({
      userId: user._id,
    });

   
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.secretKey,
      {
        expiresIn: "10d",
      }
    );

    
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.secretKey,
      {
        expiresIn: "30d",
      }
    );

   
    user.isLoggedIn = true;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Logged In Successfully",
      accessToken: accessToken,
      refreshToken: refreshToken,
      data: user,
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const logout = async(req , res)=>{
  try {
      const existing = await sessionSchema.findOne({userId:req.userId})
      const user = await userSchema.findById({_id:req.userId})

      if(existing){
        await sessionSchema.findOneAndDelete({userId:req.userId})
        user.isLoggedIn = false
        await user.save()
        return res.status(200).json({
          success: true,
          message: "Session Ended Succesfully"
        })
      }else{
        return res.status(404).json({
          success: false,
          message:"No Session Found"
        })
      }

  } catch (error) {
     return res.send(500).json({
      success: false,
      message: error.message,
    });
  }
}