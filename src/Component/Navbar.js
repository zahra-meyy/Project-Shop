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
                <div className="collapse navbar-collapse">
                    <div className="navbar-nav ms-auto">
                        {/* Navbar sebelum login */}
                        {!isLoggedIn && (
                            <>
                                <Link to="/" className="nav-link">Home</Link>
                                <Link to="/login" className="nav-link">Login</Link>
                            </>
                        )}

                        {/* Navbar saat di halaman login */}
                        {isLoggedIn === null && (
                            <>
                                <Link to="/" className="nav-link">H </Link>
                                <Link to="/" onClick={handleLoginClick} className="nav-link">Logout</Link>
                            </>
                        )}

                        {/* Navbar setelah login */}
                        {isLoggedIn && (
                            <>
                                <Link to="/Product" className="nav-link">Daftar Produk</Link>
                                <Link to="/" onClick={handleLoginClick} className="nav-link">Logout</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
