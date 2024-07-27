import React, { useState } from 'react';
import './Register.css';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        profilePic: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        country: '',
        city: ''
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value.trim() }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
          alert("Please select a file to upload.");
          return;
        }
    
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
    
        try {
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dykzmysis/image/upload",
            data
          );
    
          const { url } = uploadRes.data;
    
          const newUser = {
            ...formData,
            img: url,
          };
    
          await axios.post("https://abhinavstays.onrender.com/api/auth/register", newUser);
          navigate('/login')
        } catch (err) {
          console.error("Error during file upload:", err);
        }
      };

    return (
        <div className="registerContainer">
            <form className="registerForm" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="formGroup">
                    <label htmlFor="profilePic">Profile Picture</label>
                    <input type="file" id="profilePic" name="profilePic" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div className="formGroup">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div className="formGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="formGroup">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="formGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="formGroup">
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />
                </div>
                <div className="formGroup">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <button type="submit" className="registerButton">Register</button>
            </form>
        </div>
    );
};

export default Register;
