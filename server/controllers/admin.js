import TryCatch from "../middleware/tryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";

export const createCourse = TryCatch(async (req, res) => {
    const { title, description, price, duration, category,createdBy } = req.body;
    const image = req.file;

    if (!image) {
        return res.status(400).json({ message: "Please upload an image." });
    }

    await Courses.create({
        title,
        description,
        price,
        duration,
        category,
        createdBy,
        image: image.path,
    });

    res.status(201).json({ message: "Course created successfully" })

});

export const addLectures=TryCatch(async(req,res)=>{

    const course=await Courses.findById(req.params.id);
    if(!course) {
        return res.status(404).json({ message: "No Course with this id" });
    }
    const { title, description} = req.body;
    const file = req.file;
    const lecture = await Lecture.create({
        title,
        description,
        video: file?.path,
        course: course._id,
    });
    res.status(201).json({ message: "Lecture added successfully", lecture });
})  