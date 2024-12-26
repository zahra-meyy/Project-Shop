// src/Component/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/Navbar.css';

function Navbar({ isLoggedIn, onLoginToggle }) {

    // const handleLoginClick = () => {
    //     if (isLoggedIn) {
    //         onLoginToggle(false); // Logout
    //     }
    // };

    return (
        <nav className="navbar">
            <div className="brand">Sayur Segar</div>
            <div className="menu">
                <Link to="/" className="nav-link">Beranda</Link>
                <Link to="/product" className="nav-link">Daftar Produk</Link>
                    <Link to="/login" className="nav-link">Login</Link>
            </div>
        </nav>
    );
}

export default Navbar;
