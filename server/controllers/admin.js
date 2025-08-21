import TryCatch from "../middleware/tryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import{rm} from "fs";
import { promisify } from "util";
import fs from "fs";
import { User } from "../models/user.js";
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

export const deleteLecture=TryCatch(async(req,res)=>{
    const lecture = await Lecture.findById(req.params.id);

    if (!lecture) {
        return res.status(404).json({ message: "Lecture not found" });
    }

    if (lecture.video) {
        rm(lecture.video, () => {
            console.log("Lecture video deleted");
        });
    }
    await lecture.deleteOne();
    res.status(200).json({ message: "Lecture deleted successfully" });
});

const unlikeAsync = promisify(fs.unlink);

export const deleteCourse=TryCatch(async(req,res)=>{
    const course = await Courses.findById(req.params.id);
    const lectures = await Lecture.find({ course: course._id });
    await Promise.all(
        lectures.map(async (lecture) => {
                await unlikeAsync(lecture.video);
           console.log("Lecture video deleted");
        })
    );
    rm(course.image, () => {
        console.log("Course image deleted");
    });
    await Lecture.find({ course: req.params.id }).deleteMany();
    await course.deleteOne();

    await User.updateMany({},{$pull: { subscription: req.params.id } });
    res.status(200).json({ message: "Course deleted successfully" });
});

export const getAllStats=TryCatch(async(req, res) => {
    const totalCourses = (await Courses.find()).length;
    const totalLectures = (await Lecture.find()).length;
    const totalUsers = (await User.find()).length;

   const stats= {
        totalCourses,
        totalLectures,
        totalUsers
    };

    res.status(200).json({ stats });
    });