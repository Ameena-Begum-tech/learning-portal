import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendMail from "../middleware/sendmail.js";


export const register = async (req, res) => {
  try {
    const {email,name,password} = req.body;

    const existingUser = await User.findOne({ email });

    if(existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = {
        name,
        email,
        password: hashedPassword,
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const activationToken = jwt.sign({
        user,
        otp,
    }, process.env.Activation_Secret, {
        expiresIn: '5m'
    });
    const data={
        name,
        otp,
    };
    await sendMail(email,"E learning",data);
    res.status(200).json({
        message: "Otp send to your mail",
        activationToken,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}