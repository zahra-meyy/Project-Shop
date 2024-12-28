import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../Css/EditProduct.css';

function EditProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const navigate = useNavigate();
    const { id } = useParams(); // Mengambil ID dari URL

    // Fetch data produk berdasarkan ID ketika komponen pertama kali dimuat
    useEffect(() => {
        axios.get(`http://localhost:9090/api/data/editById/${id}`)
            .then((response) => {
                const product = response.data;
                setName(product.name);
                setPrice(product.price);
                setWeight(product.weight);
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Produk tidak ditemukan!',
                    text: 'Redirecting ke halaman produk...',
                    timer: 2000,
                    showConfirmButton: false
                });
                setTimeout(() => navigate('/product'), 2000); // Redirect setelah 2 detik
            });
    }, [id, navigate]);

    // Handle submit form
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validasi data
        if (!name || !price || !weight) {
            Swal.fire({
                icon: 'error',
                title: 'Semua field harus diisi',
                text: 'Pastikan semua kolom diisi dengan benar.',
                showConfirmButton: true,
            });
            return;
        }
    
        const updatedProduct = {
            id: parseInt(id),
            name,
            price: parseFloat(price),
            weight: parseFloat(weight),
        };
    
        // Kirim data ke server menggunakan PUT
        axios.put(`http://localhost:9090/api/data/editById/${id}`, updatedProduct)
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Produk berhasil diperbarui!',
                    timer: 2000,
                    showConfirmButton: false,
                });
                setTimeout(() => navigate('/product'), 2000); // Redirect setelah 2 detik
            })
            .catch((error) => {
                console.error("Error updating product:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal memperbarui produk',
                    text: 'Silakan coba lagi nanti.',
                    showConfirmButton: true,
                });
            });
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
