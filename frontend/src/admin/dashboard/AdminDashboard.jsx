import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../utils/Layout.jsx";
import axios from "axios";
import { server } from "../../main.jsx";
import "./dashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import { FaBook, FaVideo, FaUsers, FaPlus, FaUserCircle } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") {
    navigate("/");
  }

  const [stats, setStats] = useState({});
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentCourses, setRecentCourses] = useState([]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: { token: localStorage.getItem("token") },
      });
      setStats(data.stats);
      setRecentUsers(data.recentUsers || []);
      setRecentCourses(data.recentCourses || []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  const userGrowthData = {
    labels: stats.userGrowth?.map((item) => item.month) || [],
    datasets: [
      {
        label: "Users Growth",
        data: stats.userGrowth?.map((item) => item.count) || [],
        borderColor: "#139e8e",
        backgroundColor: "rgba(19,158,142,0.2)",
        tension: 0.3,
      },
    ],
  };

  const coursesBarData = {
    labels: stats.courseStats?.map((c) => c.title) || [],
    datasets: [
      {
        label: "Lectures per Course",
        data: stats.courseStats?.map((c) => c.lectures) || [],
        backgroundColor: "#139e8e",
      },
    ],
  };

  const usersPieData = {
    labels: ["Admins", "Students"],
    datasets: [
      {
        data: [stats.totalAdmins || 0, stats.totalUsers || 0],
        backgroundColor: ["#139e8e", "#f39c12"],
        borderColor: "#ffff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Layout>
      <div className="dashboard-background">
        <div className="dashboard-container">
        
          <div className="profile-summary">
            <FaUserCircle size={50} />
            <div>
              <p className="profile-name">{user?.name}</p>
              <p className="profile-role">{user?.role}</p>
            </div>
          </div>

        
          <div className="stats-grid">
            <div className="card">
              <FaBook size={30} />
              <p>Total Courses</p>
              <p className="stat-number">{stats.totalCoures || 0}</p>
            </div>
            <div className="card">
              <FaVideo size={30} />
              <p>Total Lectures</p>
              <p className="stat-number">{stats.totalLectures || 0}</p>
            </div>
            <div className="card">
              <FaUsers size={30} />
              <p>Total Users</p>
              <p className="stat-number">{stats.totalUsers || 0}</p>
            </div>
          </div>

         
          <div className="quick-actions">
            <button className="action-btn" onClick={() => navigate("/admin/course")}>
              <FaBook />
              <FaPlus /> Add New Course
            </button>
            <button className="action-btn" onClick={() => navigate("/admin/users")}>
              <FaUsers /> View All Users
            </button>
           
          </div>

         
          <div className="charts-section">
            <div className="chart-card">
              <h3>Users Growth (Line)</h3>
              <Line key="userGrowth" data={userGrowthData} />
            </div>
            <div className="chart-card">
              <h3>Lectures per Course (Bar)</h3>
              <Bar key="coursesBar" data={coursesBarData} />
            </div>
            <div className="chart-card">
              <h3>Users Distribution (Pie)</h3>
              <Pie key="usersPie" data={usersPieData} />
            </div>
          </div>

         
          <div className="notifications-section">
            <div className="notification-card">
              <h4>Recent Users</h4>
              <ul>
                {recentUsers.map((u) => (
                  <li key={u._id}>{u.name}</li>
                ))}
              </ul>
            </div>
            <div className="notification-card">
              <h4>New Courses</h4>
              <ul>
                {recentCourses.map((c) => (
                  <li key={c._id}>{c.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
