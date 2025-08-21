import React from 'react'
import './Footer.css'
import { AiFillFacebook } from "react-icons/ai";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";


const Footer = () => {
  return (
   <footer>
    <div className="footer-content">
        <p>
            &copy; {new Date().getFullYear()} E-Learning Platform. All rights reserved.<br 
            /> <a href="https://github.com/Ameena-Begum-tech" target="_blank" rel="noopener noreferrer"><FaGithub/>  SkillNest</a>
        </p>
        <div className="social-links">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><AiFillFacebook/></a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaSquareXTwitter/></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaSquareInstagram/></a>
            <a href="www.linkedin.com/in/ameena-begum12" target="_blank" rel="noopener noreferrer"><FaLinkedin/></a>
        </div>
    </div>
   </footer>
  )
}

export default Footer
