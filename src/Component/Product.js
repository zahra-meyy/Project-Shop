import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import Swal from 'sweetalert2'; // Untuk notifikasi
import Navbar from './Navbar';
import '../Css/Product.css';
import { API_PRODUCT } from '../utils/BaseUrl';

function Product({ isLoggedIn, onLoginToggle }) {
    const [products, setProducts] = useState([]);

    const fetchProducts = useCallback(async () => {
        const adminData = JSON.parse(localStorage.getItem("adminData"));
        const idAdmin = adminData ? adminData.id : null;
        
        if (!idAdmin) return;
        
        try {
            const response = await axios.get(`${API_PRODUCT}/getAllByAdmin/${idAdmin}`);
            console.log('API Response:', response.data); // Debugging response
            
            if (response.status === 200 && response.data) {
                setProducts(response.data);
            } else {
                setProducts([]); // Handle no data
            }
        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleDeleteProduct = async (id) => {
        // Konfirmasi penghapusan
        const confirmation = await Swal.fire({
            title: 'Anda yakin?',
            text: "Produk ini akan dihapus secara permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal'
        });
    
        if (confirmation.isConfirmed) {
            try {
                // Mengirim request untuk menghapus produk berdasarkan ID
                const response = await axios.delete(`${API_PRODUCT}/delete/${id}`);
    
                // Memeriksa apakah request berhasil
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Produk berhasil dihapus!',
                        timer: 1500,
                        showConfirmButton: false,
                    });
    
                    // Memperbarui daftar produk setelah produk dihapus
                    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal menghapus produk!',
                        text: 'Terjadi kesalahan saat menghapus produk.',
                        showConfirmButton: true,
                    });
                }
            } catch (error) {
                // Menangani error jika ada masalah dengan request
                console.error('Error deleting product:', error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal menghapus produk!',
                    text: 'Silakan coba lagi nanti.',
                    showConfirmButton: true,
                });
            }
        }
    };
    
    return (
        <div className="product-container">
            <Navbar isLoggedIn={isLoggedIn} onLoginToggle={onLoginToggle} />

            <div className="product-table-container">
                <div className="add-product-button">
                    <Link to="/AddProduct">
                        <button className="tambah-btn">Tambah Produk</button>
                    </Link>
                </div>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Gambar</th>
                            <th>Nama Produk</th>
                            <th>Harga</th>
                            <th>Berat (kg)</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.namaSayur}
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                        ) : (
                                            'Gambar tidak tersedia'
                                        )}
                                    </td>
                                    <td>{product.namaSayur}</td>
                                    <td>
                                        {product.hargaSayur && !isNaN(product.hargaSayur)
                                            ? `Rp ${product.hargaSayur.toLocaleString()}`
                                            : 'Harga tidak tersedia'}
                                    </td>
                                    <td>{product.beratSayur || 'Berat tidak tersedia'} kg</td>
                                    <td>
                                        <Link to={`/EditProduct/${product.id}`} className="edit-button">
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteProduct(product.id)}
                                            className="delete-button"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">Produk tidak ditemukan</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Product;
