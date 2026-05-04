import userSchema from "../models/userSchema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv/config"
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

    const hashpassword = await bcrypt.hash(password, 10)
    const user = await userSchema.create({ userName, email, password: hashpassword });
    const token = jwt.sign({ userId: user._id }, process.env.secretKey, {
      expiresIn: "5m"
    })

    user.token = token
    await user.save()

    try {
      await verifyMail(token, email)
    } catch (mailError) {
      console.error("Email sending failed:", mailError)
    }

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: user,
    });
  } catch (error) {
    console.error("Register error:", error)
    return res.status(500).json({
      success: false,
      message: error.message || "User not Registered",
    });
  }
};