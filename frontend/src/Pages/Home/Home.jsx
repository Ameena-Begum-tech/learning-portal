import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaCompass } from "react-icons/fa6";
import { FaBriefcase } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";


import "./Home.css";

const Home = ({user}) => {
  const navigate = useNavigate();
  const [showAccountOptions, setShowAccountOptions] = useState(false);

  const workshops = [
    {
      id: 1,
      title: "React Basics",
      description:
        "Learn the fundamentals of React and build your first interactive app.",
    },
    {
      id: 2,
      title: "Machine Learning 101",
      description: "Introduction to ML with hands-on coding exercises.",
    },
    {
      id: 3,
      title: "Cybersecurity Essentials",
      description: "Understand the basics of securing web applications.",
    },
    {
      id: 4,
      title: "Cloud Computing",
      description: "Get started with AWS, Azure, and cloud fundamentals.",
    },
  ];

  return (
    <div className="homepage-container">
      <div>
      <aside className="sidebar">
        <nav className="nav-links">
          <button onClick={() => navigate("/")} className="nav-item">
            <IoHome size={18} /> Home
          </button>
          <button onClick={()=>navigate(`/${user._id}/dashboard`)} className="nav-item">
            <FaCompass size={18} /> My Journey
          </button>
          <button onClick={() => navigate("/courses")} className="nav-item">
            <FaBookOpen size={18} /> Courses
          </button>
          <button onClick={() => navigate("/career")} className="nav-item">
            <FaBriefcase size={18} /> Professional Career
          </button>
          <button onClick={() => navigate("/playground")} className="nav-item">
            <FaRegPlayCircle size={18} /> Playground
          </button>
          
          <div>
          <div className="account-section">
            <button
              onClick={() => setShowAccountOptions(!showAccountOptions)}
              className="nav-item"
            >
              <FaUser size={18} /> Account
            </button>
            {showAccountOptions && (
              <div className="account-options">
                <button onClick={() => navigate("/account")} className="sub-item">
                  <FaUser size={16} /> Profile
                </button>
                <button className="sub-item logout" onClick={() => navigate("/login")}>
                  <LuLogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
           </div>
        </nav>
      </aside>
      </div>

     
      <main className="main-content">
        
        <section className="updates">
          <h2>Daily Updates</h2>
          <ul>
            <li>📢 New workshop on <b>React Basics</b> this Friday.</li>
            <li>🎯 Weekly quiz on Machine Learning is live now.</li>
            <li>💡 Tip: Practice coding daily for 30 minutes.</li>
            <li>🚀 New course: Introduction to Cybersecurity.</li>
          </ul>
        </section>

        <section className="workshops">
          <h2>Workshops</h2>
          <div className="workshop-cards">
            {workshops.map((ws) => (
              <div className="workshop-card" key={ws.id}>
                <h3>{ws.title}</h3>
                <p>{ws.description}</p>
                <button className="enroll-btn" onClick={() => navigate(`/course/${ws.id}`)}>Enroll</button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
