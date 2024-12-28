import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/Navbar.css';

function Navbar({ isLoggedIn, onLoginToggle }) {

    const handleLoginClick = () => {
        if (isLoggedIn) {
            onLoginToggle(false); // Logout
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar">
                <div className="brand">Sayur Segar</div>
                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <div className="collapse navbar-collapse">
                    <div className="navbar-nav ms-auto">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/Product" className="nav-link">Daftar Produk</Link>
                        <Link to="/login" className="nav-link" onClick={handleLoginClick}>
                            {isLoggedIn ? 'Logout' : 'Login'}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
