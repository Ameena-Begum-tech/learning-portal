import React from "react" 
import "./dashboard.css"
import { CourseData } from '../../context/CourseContext'
import CourseCard from "../../Components/CourseCard/CourseCard"
export const Dashboard = ({user}) => {
    const {mycourse}=CourseData()
  return (
   <div className="student-dashboard">
    <h1>Hi! <span>{user.name}</span></h1>
    <h2>Your Enrolled Courses</h2>
    <div className="dashboard-content"> 
        {
            mycourse && mycourse.length>0 ? mycourse.map((e)=>(
                <CourseCard key={e._id} course={e}/>
            )) :<p>No Courses Enrolled Yet</p>
        }
    </div>
   </div>
  )
}
