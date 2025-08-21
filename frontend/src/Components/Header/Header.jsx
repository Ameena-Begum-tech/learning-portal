import React from 'react'
import './Header.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa';

const Header = ({ isAuth }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  return (
    <header className="header">
      <div className="logo-div">
        {isHome ? (
          <>
            <img className="logo" src="https://i.ibb.co/Z1LNnrLZ/logo.png" alt="logo" onClick={() => navigate("/")} />
            <div onClick={() => navigate("/")} className='logo-name'>SkillNest</div>
          </>
        ) : (
          <button className="back-btn" onClick={() => navigate("/")}>
            <FaArrowLeft /> Back
          </button>
        )}
      </div>

      <div className='link'>
        <Link to={"/"}>Home</Link>
        <Link to={"/courses"}>Course</Link>
        <Link to={"/about"}>About</Link>
        {isAuth ? <Link to={"/Account"}>Account</Link> : <Link to={"/login"}>Login</Link>}
      </div>
    </header>
  )
}

export default Header
