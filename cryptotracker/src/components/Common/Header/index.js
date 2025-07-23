import React from 'react'
import "./styles.css"
import {Link, useNavigate} from "react-router-dom"
import TemporaryDrawer from './Drawer'
import Button from '../Button'


function Header(){
    const navigate = useNavigate();
    const handleClick = () => navigate('/');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('users'); // Remove all registered users for demo/testing
        navigate('/');
    };
    return(<div className='navbar'>
        <h1 className='logo' onClick={handleClick}>Blocklytics<span style={{color: "var(--blue)"}}>.</span></h1>
        <div className='links'>
            
            <Link to='/'>
            <p className='link'>Home</p>
            </Link>
            < Link to='/compare'>
            <p className='link'>Compare</p>
            </Link>
            
            <Link to="/dashboard">
                <Button 
                    text="dashboard" 
                    onClick={() => console.log("Btn Clicked")} 
                />
            </Link>
            {isLoggedIn && (
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            )}
            
        </div>
        <div className='mobile-drawer'>
            <TemporaryDrawer /> 
        </div>
    </div>
    )
}
export default Header