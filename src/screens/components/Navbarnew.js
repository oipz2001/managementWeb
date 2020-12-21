import React from 'react'
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Navbar.css';

export function Navbarnew() {
    return (
        <div className="navbar_pleum">
            <div className="rounded float-right">
                <Link to='/login' className="menu-bars-user">
                     <FaIcons.FaUserCircle  style={{ color:'fff'}} />
                </Link>
            </div>
        </div>
    )
}

export default Navbarnew;