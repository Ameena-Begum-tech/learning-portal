import React, { useState } from 'react';
import './register.css';
import { userData } from '../../Context/UserContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const { btnloading, registerUser } = userData();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    await registerUser(name, email, password, navigate);
  };

  return (
    <div className="register-container">
      <div className="register-card1">
        <form className="register-form" onSubmit={submitHandler}>
          <h2 className="register-title">Register</h2>
          <label className="register-label" htmlFor="name">Name</label>
          <input
            className="register-input"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />

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
            {btnloading ? 'Please wait...' : 'Register'}
          </button>
        </form>

        <p className="register-footer">
          Have an account? <Link className="register-link" to="/Login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
