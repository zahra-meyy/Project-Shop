// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Component/Dashboard';
import Login from './Component/Login';
import Product from './Component/Product';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <Routes>
                {/* Rute untuk Dashboard */}
                <Route
                    path="/"
                    element={<Dashboard isLoggedIn={isLoggedIn} onLoginToggle={setIsLoggedIn} />}
                />
                
                {/* Rute untuk Login */}
                <Route
                    path="/login"
                    element={<Login onLogin={(status) => setIsLoggedIn(status)} />}
                />
                
                {/* Rute untuk Product */}
                <Route
                    path="/product"
                    element={<Product isLoggedIn={isLoggedIn} onLoginToggle={setIsLoggedIn} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
