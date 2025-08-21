import React, { useEffect, useState } from 'react'
import "./users.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { server } from '../../main';
import Layout from '../utils/Layout';
import toast from 'react-hot-toast';

const AdminUser = ({ user }) => {
  const navigate = useNavigate();
  if (user && user.role !== 'admin') {
    navigate('/');
  }

  const [users, setUsers] = useState([])

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      setUsers(data.users)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const updateRole = async (id) => {
    if (window.confirm("Are You Sure To Update Role?")) {
      try {
        const { data } = await axios.put(`${server}/api/user/${id}`, {}, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        toast.success(data.message)
        await fetchUser()
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong")
      }
    }
  }

  return (
    <Layout>
      <div className="users-container">
        <h1 className="users-title">👥 All Users</h1>
        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Update Role</th>
              </tr>
            </thead>
            <tbody>
              {users && users.map((e, i) => (
                <tr key={e._id}>
                  <td>{i + 1}</td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>
                    <span className={`role-badge ${e.role}`}>
                      {e.role}
                    </span>
                  </td>
                  <td>
                    <button className='update-btn' onClick={() => updateRole(e._id)}>
                      Update Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default AdminUser
