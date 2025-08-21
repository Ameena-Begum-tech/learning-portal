import React from "react";
import "./About.css";
import { FaBookOpen, FaUsers, FaLaptopCode, FaAward } from "react-icons/fa";

const About = () => {
  return (
    <div className="about">
      <div className="about-content">
        <h2>About Us</h2>
        <p>
          Welcome to <span className="highlight">Our E-Learning Platform</span>, 
          designed to empower learners with accessible, engaging, and 
          high-quality education <strong>anytime, anywhere</strong>.
        </p>

        <div className="about-features">
          <div className="feature-card">
            <FaBookOpen className="icon" />
            <h3>Wide Range of Courses</h3>
            <p>
              From beginner to advanced, explore curated courses that fit your career goals.
            </p>
          </div>

          <div className="feature-card">
            <FaLaptopCode className="icon" />
            <h3>Practical Learning</h3>
            <p>
              Hands-on projects, interactive dashboards, and real-world problem solving.
            </p>
          </div>

          <div className="feature-card">
            <FaUsers className="icon" />
            <h3>Community & Mentorship</h3>
            <p>
              Connect with peers and mentors to grow together in a supportive environment.
            </p>
          </div>

          <div className="feature-card">
            <FaAward className="icon" />
            <h3>Track Your Progress</h3>
            <p>
              Personalized learning paths with progress tracking to achieve milestones.
            </p>
          </div>
        </div>

        <div className="about-footer">
          <h4>🎯 Our Mission</h4>
          <p>
            To <span className="highlight">bridge the gap</span> between knowledge 
            and application, helping learners gain 
            <strong> real-world skills </strong> for success in today’s fast-evolving industries.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
