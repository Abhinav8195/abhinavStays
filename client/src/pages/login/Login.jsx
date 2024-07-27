import React, { useContext, useState } from 'react'
import'./login.css'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [credentials,setCredientals]=useState({
        username:undefined,
        password:undefined
    })

    const{loading,error,dispatch}=useContext(AuthContext);
    const navigate= useNavigate();


    const handleChange=(e)=>{
        setCredientals((prev)=>({...prev,[e.target.id]:e.target.value}))
    }
    const handleClick= async(e)=>{
        e.preventDefault();
        dispatch({type:'LOGIN_START'})
        try{
            const res=await axios.post('https://abhinavstays.onrender.com/api/auth/login',credentials);
            dispatch({type:'LOGIN_SUCCESS',payload:res.data.details})
            navigate('/')
        }catch(err){
            dispatch({type:'LOGIN_FAILURE',payload:err.response.data})
        }
    }
    

  return (
    
   <div className="login">
   <div className='lContainer'>
   <h1>Welcome User! Please Login In your account </h1>
   </div>
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

 

export default Login