import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import '../Css/AddProduct.css';

function AddProduct() {
  const [namaSayur, setNamaSayur] = useState('');
  const [hargaSayur, setHargaSayur] = useState('');
  const [beratSayur, setBeratSayur] = useState('');
  const [image, setImage] = useState(null); // Mengubah state untuk menyimpan file gambar
  const navigate = useNavigate();
  const idAdmin = localStorage.getItem("idAdmin");

  // Fungsi untuk menangani perubahan pada file input
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Menyimpan file gambar yang dipilih
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Menggunakan FormData untuk mengirim file bersama data lainnya
    formData.append('namaSayur', namaSayur);
    formData.append('hargaSayur', hargaSayur);
    formData.append('beratSayur', beratSayur);
    if (image) {
      formData.append('image', image); // Menambahkan file gambar ke FormData
    }

    try {
      // Mengirim data ke server dengan FormData
      const response = await axios.post(`http://localhost:9090/api/data/tambah/${idAdmin}`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data' // Menggunakan multipart/form-data untuk upload file
        }
      });

      Swal.fire({ icon: 'success', title: 'Produk berhasil ditambahkan!', timer: 1500, showConfirmButton: false });
      navigate('/Product');
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Gagal menambahkan produk!', text: 'Silakan coba lagi nanti.', showConfirmButton: true });
    }
  };

  return (
    <div className="add-product-container">
      <form onSubmit={handleSubmit} className="add-product-form">
        <h2 className="form-title">Tambah Produk</h2>
        <input type="text" placeholder="Nama Sayur" value={namaSayur} onChange={(e) => setNamaSayur(e.target.value)} required className="input-field" />
        <input type="number" placeholder="Harga Sayur" value={hargaSayur} onChange={(e) => setHargaSayur(e.target.value)} required className="input-field" />
        <input type="number" placeholder="Berat Sayur (kg)" value={beratSayur} onChange={(e) => setBeratSayur(e.target.value)} required className="input-field" />
        
        {/* Menambahkan input untuk memilih file gambar */}
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          className="input-field" 
        />

        <button type="submit" className="submit-button">Tambah Produk</button>
      </form>
    </div>
  );
}

export default AddProduct;
