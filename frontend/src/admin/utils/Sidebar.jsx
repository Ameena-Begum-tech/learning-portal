import "./common.css"

import React from 'react'
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaBook, FaUserAlt } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";



const Sidebar = () => {
  return (
    <div className="sidebar">
        <ul>
            <li>
                <Link to={"/admin/dashboard"}>
                <div className="icon">
                  <IoMdHome/>
                </div>
                <span>Home</span>
                </Link>
            </li>
             <li>
                <Link to={"/admin/course"}>
                <div className="icon">
                  <FaBook/>
                </div>
                <span>Courses</span>
                </Link>
            </li>
            <li>
                <Link to={"/admin/users"}>
                <div className="icon">
                  <FaUserAlt/>
                </div>
                <span>Users</span>
                </Link>
            </li>
             <li>
                <Link to={"/account"}>
                <div className="icon">
                  <AiOutlineLogout/>
                </div>
                <span>Logout</span>
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar
