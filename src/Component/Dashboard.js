import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import Navbar from './Navbar';
import image1 from '../../src/image/broccolI.jpg';
import image2 from '../../src/image/TOMAT.jpg';
import image3 from '../../src/image/terong ungu.jpg';
import image4 from '../../src/image/SAWI HIJAU.jpeg';
import image5 from '../../src/image/SAWI PUTIH.jpg';
import image6 from '../../src/image/PARE.jpg';
import image7 from '../../src/image/PAPRIKA.jpg';
import image8 from '../../src/image/Jamue Shitake.webp';
import image9 from '../../src/image/SELADA.jpg';
import image10 from '../../src/image/WORTELL.jpg';
import '../Css/Dashboard.css';

function Dashboard({ isLoggedIn, onLoginToggle }) {
    const navigate = useNavigate(); // Inisialisasi navigate dengan benar

    const [products, setProducts] = useState([
        { id: 1, name: 'Sayur Brokoli', image: image1, price: 15000, weight: 0.5 },
        { id: 2, name: 'Sayur Tomat', image: image2, price: 12000, weight: 0.3 },
        { id: 3, name: 'Sayur Terong Ungu', image: image3, price: 17000, weight: 0.4 },
        { id: 4, name: 'Sayur Sawi Hijau', image: image4, price: 50000, weight: 1 },
        { id: 5, name: 'Sayur Sawi Putih', image: image5, price: 150000, weight: 1.5 },
        { id: 6, name: 'Pare', image: image6, price: 250000, weight: 0.5 },
        { id: 7, name: 'Paprika', image: image7, price: 250000, weight: 0.5 },
        { id: 8, name: 'Jamur Shitake', image: image8, price: 250000, weight: 0.5 },
        { id: 9, name: 'Selada', image: image9, price: 250000, weight: 0.5 },
        { id: 10, name: 'Wortel', image: image10, price: 250000, weight: 0.5 },
    ]);

    const handleAddProduct = () => {
        const newProduct = {
            id: products.length + 1,
            name: 'Produk Baru',
            image: image1,
            price: 10000,
            weight: 0.5,
        };
        setProducts([...products, newProduct]);
    };

    const handleEditProduct = (id) => {
        const editedProducts = products.map((product) =>
            product.id === id ? { ...product, name: 'Produk Diedit' } : product
        );
        setProducts(editedProducts);
    };

    const handleDeleteProduct = (id) => {
        const filteredProducts = products.filter((product) => product.id !== id);
        setProducts(filteredProducts);
    };

    const handleBuyNow = (product) => {
        // Gunakan SweetAlert2 untuk menampilkan pesan
        Swal.fire({
            title: 'Produk Ditambahkan!',
            text: `Anda telah menambahkan ${product.name} ke keranjang.`,
            icon: 'success',
            confirmButtonText: 'Lanjutkan Belanja',
        }).then((result) => {
            if (result.isConfirmed) {
                // Setelah konfirmasi, arahkan ke halaman checkout (misalnya)
                navigate('/');
            }
        });
    };

    return (
        <div className="dashboard">
            <Navbar isLoggedIn={isLoggedIn} onLoginToggle={onLoginToggle} />
            <div className="container">
                <h1 className="h1">Welcome to the fresh vegetable shop</h1>
                <h2 className="h2">Dapatkan sayur segar berkualitas tinggi untuk keluarga Anda. Segar, sehat, dan penuh manfaat!</h2>
                
                {isLoggedIn && (
                    <button className="add-product-button" onClick={handleAddProduct}>
                        Tambah Produk
                    </button>
                )}
                <div className="product-list">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.name} className="product-image" />
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">Harga: Rp {product.price.toLocaleString()}</p>
                            <p className="product-weight">Berat: {product.weight} gram</p>
                            <div className="button-container">
                                <button 
                                    className="button buy-now-button" 
                                    onClick={() => handleBuyNow(product)} // Call the handleBuyNow function
                                >
                                    Buy Now
                                </button>
                                {isLoggedIn && (
                                    <>
                                        <button onClick={() => handleEditProduct(product.id)} className="button edit-button">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDeleteProduct(product.id)} className="button delete-button">
                                            Hapus
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
