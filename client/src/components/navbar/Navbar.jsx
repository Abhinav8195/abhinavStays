import React, { useContext, useState } from 'react';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout,dispatch } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    
    const handleLogout= async(e)=>{
        e.preventDefault();
        dispatch({type:'LOGOUT'})
        try{
            navigate('/')
        }catch(err){
            dispatch({type:'LOGIN_FAILURE',payload:err.response.data})
        }
    }

    return (
        <div className='navbar'>
            <div className="navContainer">
                <span onClick={handleNavigate} className="logo">Abhinav Stays</span>
                {user ? (
                    <div className="navItems">
                        <span onClick={toggleDropdown} className="username">{user.username}</span>
                        {dropdownOpen && (
                            <div className="dropdown">
                                <button onClick={handleLogout} className="dropdownItem">Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="navItems">
                        <Link to={'/register'}>
                        <button className="navButton">Register</button>
                        </Link>
                        <Link to={'/login'}>
                            <button className="navButton">Login</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
