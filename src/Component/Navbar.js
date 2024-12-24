// src/Component/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Navbar.css';

function Navbar({ isLoggedIn, onLoginToggle }) {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        if (isLoggedIn) {
            onLoginToggle(false); // Logout
            navigate('/login'); // Redirect to login page
        } else {
            navigate('/login'); // Redirect to login
        }
    };

    const handleHomeClick = () => {
        navigate('/'); // Redirect ke Dashboard (halaman utama)
    };

    const handleProductListClick = () => {
        navigate('/product'); // Redirect ke Daftar Produk
    };

    return (
        <nav className="navbar">
            <div className="brand">Sayur Segar</div>
            <div className="menu">
                <button onClick={handleHomeClick}>Beranda</button>
                <button onClick={handleProductListClick}>Daftar Produk</button>
                <button onClick={handleLoginClick}>
                    {isLoggedIn ? 'Logout' : 'Login'}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
