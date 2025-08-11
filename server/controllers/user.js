import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendMail from "../middleware/sendmail.js";
import TryCatch from "../middleware/tryCatch.js";


export const register = TryCatch(async (req, res, next) => {
  const { email, name, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res
      .status(409)
      .json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    name,
    email,
    password: hashedPassword, };

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const activationToken = jwt.sign({
    user,
    otp,
  },process.env.Activation_Secret,{ expiresIn: "5m" });

  const data = {
    name,
    otp,
  };
  await sendMail(email, "E learning", data);

  res.status(200).json({
    message: "Otp send to your mail",
    activationToken,
  });
})

export const verifyUser=TryCatch(async (req, res) => {
const { otp, activationToken } = req.body;
const verify=jwt.verify(activationToken, process.env.Activation_Secret);
if(!verify) {
  return res.status(400).json({ message: "Otp Expired" });
}
if(verify.otp !==String(otp)) {
    return res.status(400).json({ message: "Invalid OTP" });
}
await User.create({
  name: verify.user.name,
  email: verify.user.email,
  password: verify.user.password,
})
res.status(201).json({ message: "User registered successfully" });
})

export const loginUser=TryCatch(async(req,res)=>{
  const {email,password}=req.body;
  const user= await User.findOne({ email });
  if(!user) {
    return res.status(404).json({ message: "No User With this email" });
  }
    const matchpassword=await bcrypt.compare(password,user.password);
    if(!matchpassword) {
      return res.status(400).json({ message: "Wrong Password" });
    }
    const token=jwt.sign({_id: user._id}, process.env.Jwt_Sec, {
      expiresIn: "15d"});
      res.json({
        message:`Welcome back ${user.name}`,
        token,
        user,
      })
});

export const myProfile=TryCatch(async(req,res)=>{
  const user=await User.findById(req.user._id);
  res.json({user})
})