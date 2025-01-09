import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios'; // Import axios
import '../Css/AddProduct.css';

function AddProduct() {
    const [namaSayur, setNamaSayur] = useState('');
    const [hargaSayur, setHargaSayur] = useState('');
    const [beratSayur, setBeratSayur] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate(); // useNavigate hook untuk navigasi programatik

    // Ambil idAdmin dari localStorage
    const idAdmin = localStorage.getItem("idAdmin");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            namaSayur,
            hargaSayur,
            beratSayur,
            image,
        };

        try {
            // Mengirim permintaan POST ke API dengan ID admin menggunakan axios
            const response = await axios.post(`http://localhost:9090/api/data/tambah/${idAdmin}`, newProduct, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            Swal.fire({
                icon: 'success',
                title: 'Produk berhasil ditambahkan!',
                showConfirmButton: false,
                timer: 1500,
            });

            // Arahkan ke halaman produk setelah sukses
            navigate('/Product'); // Menavigasi ke halaman Product
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal menambahkan produk!',
                text: 'Silakan coba lagi nanti.',
                showConfirmButton: true,
            });
        }
    };

    return (
        <div className="add-product-container">
            <form onSubmit={handleSubmit} className="add-product-form">
                <h2 className="form-title">Tambah Produk</h2>
                <input
                    type="text"
                    placeholder="Nama Sayur"
                    value={namaSayur}
                    onChange={(e) => setNamaSayur(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="number"
                    placeholder="Harga Sayur"
                    value={hargaSayur}
                    onChange={(e) => setHargaSayur(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="number"
                    placeholder="Berat Sayur (kg)"
                    value={beratSayur}
                    onChange={(e) => setBeratSayur(e.target.value)}
                    required
                    className="input-field"
                />
                {/* Uncomment this if you want to allow image URL */}
                {/* <input
                    type="text"
                    placeholder="URL Gambar"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="input-field"
                /> */}
                <button type="submit" className="submit-button">Tambah Produk</button>
            </form>
        </div>
    );
}

export default AddProduct;