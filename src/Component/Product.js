import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Css/Product.css';
import Navbar from './Navbar'; // Import Navbar

function Product({ isLoggedIn, onLoginToggle }) {
    const [products, setProducts] = useState([
        { id: 1, name: 'Sayur Brokoli', price: 15000, weight: 0.5 },
        { id: 2, name: 'Sayur Tomat', price: 12000, weight: 0.3 },
        { id: 3, name: 'Sayur Terong Ungu', price: 17000, weight: 0.4 },
        { id: 4, name: 'Sayur Sawi Hijau', price: 50000, weight: 1 },
        { id: 5, name: 'Sayur Sawi Putih', price: 150000, weight: 1.5 },
        { id: 6, name: 'Pare', price: 250000, weight: 0.5 },
        { id: 7, name: 'Paprika', price: 250000, weight: 0.5 },
        { id: 8, name: 'Jamur Shitake', price: 250000, weight: 0.5 },
        { id: 9, name: 'Selada', price: 250000, weight: 0.5 },
        { id: 10, name: 'Wortel', price: 250000, weight: 0.5 },
    ]);

    const handleDeleteProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    return (
        <div className="product-container">
            {/* Navbar */}
            <Navbar isLoggedIn={isLoggedIn} onLoginToggle={onLoginToggle} />

            <div className="product-table-container">
                {/* Button to add product */}
                {isLoggedIn && (
                    <Link to="/add-product" className="add-product-button">
                        Tambah Produk
                    </Link>
                )}

                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Nama Produk</th>
                            <th>Harga</th>
                            <th>Berat (kg)</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>Rp {product.price.toLocaleString()}</td>
                                <td>{product.weight}</td>
                                <td>
                                    {isLoggedIn && (
                                        <>
                                            <Link
                                                to={`/edit-product/${product.id}`}
                                                className="edit-button"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="delete-button"
                                            >
                                                Hapus
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Product;
