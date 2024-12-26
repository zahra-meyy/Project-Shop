// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Component/Dashboard';
import Login from './Component/Login';
import Product from './Component/Product';
import AddProduct from './Component/AddProduct'; // Halaman Tambah
import EditProduct from './Component/EditProduct'; // Halaman Edit


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <Routes>
                {/* Route for Dashboard */}
                <Route
                    path="/"
                    element={<Dashboard isLoggedIn={isLoggedIn} onLoginToggle={setIsLoggedIn} />}
                />
                
                {/* Route for Login */}
                <Route
                    path="/login"
                    element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />}
                />
                
                {/* Route for Product */}
                <Route
                    path="/product"
                    element={<Product isLoggedIn={isLoggedIn} onLoginToggle={setIsLoggedIn} />}
                />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/edit-product/:id" element={<EditProduct />} />
            </Routes>
        </Router>
    );
}

export default App;