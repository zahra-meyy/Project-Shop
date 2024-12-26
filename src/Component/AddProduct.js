import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/AddProduct.css';

function AddProduct({ addProduct }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            id: Date.now(),  // generate ID based on timestamp
            name,
            price: parseInt(price),
            weight: parseFloat(weight),
        };
        addProduct(newProduct);  // Call parent function to add product
        navigate('/product');  // Redirect to product list
    };

    return (
        <div className="add-product-container">
            <h2>Tambah Produk</h2>
            <form onSubmit={handleSubmit} className="add-product-form">
                <label>Nama Produk:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label>Harga:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <label>Berat (kg):</label>
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                />
                <button type="submit">Tambah Produk</button>
            </form>
        </div>
    );
}

export default AddProduct;