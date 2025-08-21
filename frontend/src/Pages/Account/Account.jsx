import React, { useState } from 'react'
import { MdDashboard } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { userData } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Account.css';
import axios from 'axios';
import { server } from '../../main';
import { FaCamera } from "react-icons/fa";


const Account = ({ user }) => {
  const { setIsAuth, setUser } = userData();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(user.avatar?.url || user.avatar || "");
  const [file, setFile] = useState(null);

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success('Logged Out');
    navigate('/login');
  }

  // Handle photo upload preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if(selectedFile){
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      }
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  }

  // Save photo to server
  const uploadAvatar = async () => {
    if(!file) return toast.error("Select a photo first!");
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const { data } = await axios.put(
        `${server}/api/user/avatar`,
        formData,
        { headers: { token: localStorage.getItem("token") } }
      );

      toast.success("Profile photo updated!");
      // Update the avatar preview
      setAvatar(data.avatar);
      // Update the user in context. We update the URL within the avatar object
      // to keep the data structure consistent.
      setUser(prev => ({ 
        ...prev, 
        avatar: { ...prev.avatar, url: data.avatar } 
      }));
      setFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error uploading photo");
    }
  }

  return (
    <div className="account-page">
      {user && (
        <div className="profile-card">
          <div className="profile-header">
           <div className="avatar-wrapper">
  <img
    src={avatar || "https://i.ibb.co/4wZQzDWh/Whats-App-Image-2025-08-18-at-12-52-30-PM.jpg"}
    alt="avatar"
    className="profile-avatar"
  />
  <input type="file" onChange={handleFileChange} className="avatar-input"/>
  <div className="camera-icon">
    <FaCamera />
  </div>
  {file && (
    <button className="common-btn upload-btn" onClick={uploadAvatar}>
      Save Photo
    </button>
  )}
</div>  
            <div className="profile-name">
              <h2>{user.name}</h2>
              <span className={`role-badge ${user.role}`}>{user.role.toUpperCase()}</span>
            </div>
          </div>

          <div className="profile-info">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Subscription:</strong> {user.subscription.length > 0 ? `${user.subscription.length} Courses` : "No Courses Enrolled"}</p>
            <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="profile-buttons">
            <button className='common-btn' onClick={() => navigate(`/${user._id}/dashboard`)}>
              <MdDashboard /> My Dashboard
            </button>

            {user.role === "admin" && (
              <button className='common-btn' onClick={() => navigate(`/admin/dashboard`)}>
                <MdDashboard /> Admin Dashboard
              </button>
            )}

            <button className='common-btn logout-btn' onClick={logoutHandler}>
              <IoLogOutOutline /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Account;
