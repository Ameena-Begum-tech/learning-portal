import TryCatch from "../middleware/tryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/user.js";
import { instance } from "../index.js";
import crypto from "crypto";
import { Payment } from "../models/Payment.js";

export const getAllCourses=TryCatch(async (req, res) => {
    const courses = await Courses.find();
    res.status(200).json(
        {
            courses,
        });
    });
export const getSingleCourse=TryCatch(async (req, res) => {
    const course = await Courses.findById(req.params.id)
    res.json({
        course,
    });

});

export const fetchLectures=TryCatch(async (req, res) => {
    const lectures = await Courses.find();
    res.status(200).json(
        {
            lectures,
        });
    });


export const fetchLecture=TryCatch(async (req, res) => {
    const lecture=await Lecture.findById(req.params.id);

    if (!lecture) {
        return res.status(404).json({ message: "Lecture not found" });
    }

    const user=await User.findById(req.user._id);
    if(user.role ==="admin"){
        return res.json({lecture})
    }
    // Check subscription against the course the lecture belongs to
    if(!user.subscription.includes(lecture.course)) {
        return res.status(403).json({ message: "You must be subscribed to the course to access this lecture." });
    }
    res.json({ lecture });
});

export const getMyCourses=TryCatch(async (req, res) => {
    const courses =await Courses.find({ _id: req.user.subscription });
    res.status(200).json({
        courses,
    });
});

export const checkout=TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);
    const course = await Courses.findById(req.params.id);
    if(user.subscription.includes(course._id)) {
        return res.status(400).json({ message: "You are already subscribed to this course." });
    }
    const options = {
        amount: Number(course.price * 100), 
        currency: "INR",
    };
    const order = await instance.orders.create(options);
    
    res.status(200).json({
        order,
        course,
    });
});

export const paymentVerification=TryCatch(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body= razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
    if (!isAuthentic) {
        return res.status(400).json({ message: "Payment Failed" });
    }
    else{
        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });

        const user = await User.findById(req.user._id);
        const course = await Courses.findById(req.params.id);
        user.subscription.push(course._id);
        await user.save();

        res.status(200).json({ message: "Course Purchase Successfully" }); 
    }
});
