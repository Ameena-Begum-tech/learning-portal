import React, { useEffect } from 'react';
import "./CourseStudy.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import { server } from '../../main';

const CourseStudy = ({ user }) => {
    const params = useParams();
    const { fetchCourse, course } = CourseData();
    const navigate = useNavigate();

    if (user && user.role !== "admin" && !user.subscription.includes(params.id))
        return navigate("/");

    useEffect(() => {
        fetchCourse(params.id);
    }, []);

    return (
        <>
            {course && (
                <div className="course-study-page">
                    <div className="course-card1">
                      <div className='img1'>
                        <img src={`${server}/${course.image}`} alt={course.title} className="course-image"/>
                        </div>
                        <div className="course-content1">
                            <h2>{course.title}</h2>
                            <p>{course.description}</p>
                            <div className="course-details1">
                                <span>Instructor: {course.createdBy}</span><br/>
                                <span>Duration: {course.duration}</span>
                            </div>
                            <Link to={`/lectures/${course._id}`} className="lecture-btn1">
                                Go to Lectures
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CourseStudy;
