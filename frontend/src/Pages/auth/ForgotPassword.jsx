import React, { useState } from 'react';
import "./register.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { server } from "../../main";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [btnloading, setBtnLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);
        try {
            const { data } = await axios.post(`${server}/api/user/forgot`, { email });
            toast.success(data.message);
            navigate("/login");
            setBtnLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            setBtnLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card1">
                
                <form className="register-form" onSubmit={handleSubmit}>
                  <h2 className="register-title">Forgot Password</h2>
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
                    <button
                        className="register-button"
                        type="submit"
                        disabled={btnloading}
                    >
                        {btnloading ? "Please wait..." : "Send Reset Link"}
                    </button>
                </form>
            </div>
        </div>
    );
};
