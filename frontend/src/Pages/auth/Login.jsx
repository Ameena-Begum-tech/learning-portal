import React, { useState } from 'react';
import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import { userData } from '../../Context/UserContext.jsx';
import { CourseData } from '../../context/CourseContext.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { btnloading, loginUser } = userData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { fetchMyCourse } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate, fetchMyCourse);
  };

  return (
    <div className="register-container">
      <div className="register-card1">
        
        <form className="register-form" onSubmit={submitHandler}>
          <h2 className="register-title">Login</h2>
          <label className="register-label" htmlFor="email">Email</label>
          <input
            className="register-input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <label className="register-label" htmlFor="password">Password</label>
          <input
            className="register-input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <button
            className="register-button"
            type="submit"
            disabled={btnloading}
          >
            {btnloading ? 'Please wait...' : 'Login'}
          </button>
        </form>

        <p className="register-footer">
          Don't have an account? <Link className="register-link" to="/register">Register</Link>
        </p>
        <p className="register-footer">
          <Link className="register-link" to="/forgot">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
