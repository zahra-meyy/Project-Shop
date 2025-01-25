import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import '../Css/EditProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const adminData = JSON.parse(localStorage.getItem('adminData'));
  const idAdmin = adminData?.id || null;

  // Fetch produk yang ingin diubah
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/product/data/product/${id}`);
        console.log("Response produk:", response.data); // Debug log
        const data = response.data;
        if (data) {
          setProduct(data);
          setName(data.namaSayur || '');
          setPrice(data.hargaSayur || '');
          setWeight(data.beratSayur || '');
        } else {
          throw new Error("Produk tidak ditemukan.");
        }
      } catch (error) {
        console.error("Error fetch product:", error);
        Swal.fire({
          icon: 'error',
          title: 'Produk tidak ditemukan!',
          text: 'Redirecting ke halaman produk...',
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => navigate('/product'), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  // Menangani perubahan gambar
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Menangani form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name.trim() || !price || !weight) {
      Swal.fire({
        icon: 'warning',
        title: 'Semua kolom wajib diisi!',
        text: 'Silakan periksa kolom input.',
      });
      return;
    }
  
    const updatedProduct = {
      id: product.id,
      namaSayur: name.trim(),
      hargaSayur: parseFloat(price),
      beratSayur: weight.trim(),
    };
  
    const formData = new FormData();
    formData.append('product', JSON.stringify(updatedProduct));
    formData.append('idAdmin', idAdmin);
    if (image) {
      formData.append('file', image);
    }
  
    try {
      const response = await axios.put(
        `http://localhost:9090/api/product/data/edit/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Produk berhasil diperbarui!',
        timer: 2000,
        showConfirmButton: false,
      });
      setTimeout(() => navigate('/product'), 2000);
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
      Swal.fire({
        icon: 'error',
        title: 'Gagal memperbarui produk',
        text: error.response?.data?.message || 'Terjadi kesalahan, coba lagi nanti.',
      });
    }
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }

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
        <label>Gambar Produk:</label>
        <input
          type="file"
          onChange={handleImageChange}
        />
        <button type="submit">Update Produk</button>
      </form>
    </div>
  );
};

export default EditProduct;
