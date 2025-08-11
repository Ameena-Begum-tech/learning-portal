import TryCatch from "../middleware/tryCatch.js";
import { Courses } from "../models/Courses.js";

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
    })
})