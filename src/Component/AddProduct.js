import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import '../Css/AddProduct.css';
import { API_PRODUCT } from '../utils/BaseUrl';

function AddProduct() {
  const [namaSayur, setNamaSayur] = useState('');
  const [hargaSayur, setHargaSayur] = useState('');
  const [beratSayur, setBeratSayur] = useState('');
  const [image, setImage] = useState(null); // Menyimpan file gambar
  const [imageUrl, setImageUrl] = useState(''); // Menyimpan URL gambar yang diupload
  const navigate = useNavigate();
  const idAdmin = localStorage.getItem("idAdmin");

  // Fungsi untuk menangani perubahan pada file input
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Menyimpan file gambar yang dipilih
    setImageUrl(URL.createObjectURL(e.target.files[0])); // Menyimpan URL sementara untuk preview gambar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Menyiapkan data produk dalam format JSON
    const product = {
      namaSayur,
      hargaSayur,
      beratSayur,
    };

    // Menambahkan produk sebagai JSON
    formData.append('product', JSON.stringify(product));

    // Menambahkan file gambar
    if (image) {
      formData.append('file', image);
    } else {
      console.log('Tidak ada gambar yang dipilih.');
    }

    try {
      const response = await axios.post(`${API_PRODUCT}/tambah/${idAdmin}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Jika berhasil
      Swal.fire({
        icon: 'success',
        title: 'Produk berhasil ditambahkan!',
        timer: 1500,
        showConfirmButton: false,
      });

      // Menyimpan URL gambar dari response untuk ditampilkan di halaman
      setImageUrl(response.data.fotoUrl);

      navigate('/Product');
    } catch (error) {
      console.error(error);
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
        
        {/* Input untuk memilih file gambar */}
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          className="input-field" 
        />

        <button type="submit" className="submit-button">Tambah Produk</button>
      </form>

      {/* Menampilkan gambar jika ada */}
      {imageUrl && (
        <div className="image-preview">
          <h3>Preview Gambar Produk:</h3>
          <img src={imageUrl} alt="Gambar Produk" className="preview-image" />
        </div>
      )}
    </div>
  );
}

export default AddProduct;
