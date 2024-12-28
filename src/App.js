import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from './Component/Product';
import Dashboard from './Component/Dashboard';
import Login from './Component/Login';
import AddProduct from './Component/AddProduct'; 
import EditProduct from './Component/EditProduct';
import PrivateRoute from './Private/PrivateRoutes'; 
import Register from './Component/Register';// Import PrivateRoute
import Navbar from './Component/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar isLoggedIn={!!localStorage.getItem('token')} onLogout={() => localStorage.removeItem('token')} />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Navbar" element={<Navbar />} />
            <Route path="/Product" element={<PrivateRoute><Product/></PrivateRoute>} />
            <Route path="/AddProduct" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
            <Route path="/EditProduct/:id" element={<PrivateRoute><EditProduct/></PrivateRoute>} />
            {/* Protecting routes with PrivateRoute */}
            {/* <Route path="/Product" element={<PrivateRoute element={<Product />} />} />
            <Route path="/add-product" element={<PrivateRoute element={<AddProduct />} />} />
            <Route path="/editProduct/:id" element={<PrivateRoute element={<EditProduct />} />} /> */}
            <Route path="/register" element={<Register />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;