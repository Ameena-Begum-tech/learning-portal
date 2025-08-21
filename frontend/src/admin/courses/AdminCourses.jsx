import React, { useState } from 'react'
import Layout from '../utils/Layout'
import { useNavigate } from 'react-router-dom'
import { CourseData } from '../../context/CourseContext';
import CourseCard from '../../Components/CourseCard/CourseCard';
import { FaCamera } from 'react-icons/fa';
import toast from 'react-hot-toast';
import axios from 'axios'; 
import { server } from '../../main';
import "./AdminCourses.css"

const categories = [
  "Web Development",
  "App Development",
  "Game Development",
  "Data Science",
  "Cyber Security",
  "Machine Learning",
  "Artificial Intelligence",
  "Block Chain",
  "Cloud Computing"
]

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== 'admin') {
    navigate('/');
  }

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [duration, setDuration] = useState('');
  const [imagePreview, setImagePreview] = useState('')
  const [btnLoading, setBtnLoading] = useState(false);

  const { courses, fetchCourses } = CourseData();

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = () => {
        setImagePreview(reader.result)
        setImage(file)
      }
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('price', price);
    myForm.append('file', image);
    myForm.append('category', category);
    myForm.append('createdBy', createdBy);
    myForm.append('duration', duration);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, myForm, {
        headers: { token: localStorage.getItem('token') }
      });

      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      setTitle('');
      setDescription('');
      setPrice('');
      setImage('');
      setCategory('');
      setCreatedBy('');
      setDuration('');
      setImagePreview('');
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding course");
      setBtnLoading(false);
    }
  }

  return (
    <Layout>
      <div className="admin-courses">
        <div className="left">
          <h1>All Courses</h1>
          <div className="dashboard-content">
            {courses && courses.length > 0
              ? courses.map((e) => <CourseCard key={e._id} course={e} />)
              : <p>No Courses Yet</p>}
          </div>
        </div>

        <div className="admin-right">
          <div className="course-card2">
            <h2 className="course-card-title">Add New Course</h2>
            <form className="course-form1" onSubmit={submitHandler}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className='form-input'
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label htmlFor="description">Description</label>
              <input
                type="text"
                className='form-input'
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <label htmlFor="price">Price</label>
              <input
                type="number"
                className='form-input'
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />

              <label htmlFor="createdBy">Created By</label>
              <input
                type="text"
                className='form-input'
                id="createdBy"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                required
              />

              <label htmlFor="category">Category</label>
              <select
                id="category"
                className='form-input'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => <option value={cat} key={cat}>{cat}</option>)}
              </select>

              <label htmlFor="duration">Duration (Hours)</label>
              <input
                type="number"
                className='form-input'
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />

              <label htmlFor="courseImage">Course Image</label>
              <div className="image-upload-wrapper">
                <input
                  type="file"
                  className='form-input'
                  id="courseImage"
                  onChange={changeImageHandler}
                  accept="image/*"
                />
                
              </div>

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Course Preview"
                  className="course-image-preview"
                />
              )}

              <button
                type="submit"
                className="submit-course-btn"
                disabled={btnLoading}
              >
                {btnLoading ? "Please Wait..." : "Add Course"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminCourses;
