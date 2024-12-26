import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Css/EditProduct.css';

function EditProduct({ products, updateProduct }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    // Populate form fields with product data
    useEffect(() => {
        const product = products.find((product) => product.id === parseInt(id));
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setWeight(product.weight);
        }
    }, [id, products]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create updated product object
        const updatedProduct = {
            id: parseInt(id),
            name,
            price: parseFloat(price),
            weight: parseFloat(weight),
        };

        // Update product and navigate back to the product list
        updateProduct(updatedProduct);
        navigate('/product');
    };

    return (
        <div className="edit-product-container">
            <h2>Edit Produk</h2>
            <form onSubmit={handleSubmit} className="edit-product-form">
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
                <button type="submit">Update Produk</button>
            </form>
        </div>
    );
}

export default EditProduct;