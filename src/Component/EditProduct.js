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
  const [image, setImage] = useState(null); // state untuk gambar
  const [loading, setLoading] = useState(true); // state loading
  const adminData = JSON.parse(localStorage.getItem('adminData'));
  const idAdmin = adminData ? adminData.id : null;

  // Fetch produk yang ingin diubah
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/product/data/product/${id}`);
        const data = response.data;
        setProduct(data);
        setName(data.namaSayur || '');
        setPrice(data.hargaSayur || '');
        setWeight(data.beratSayur || '');
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Produk tidak ditemukan!',
          text: 'Redirecting ke halaman produk...',
          timer: 2000,
          showConfirmButton: false
        });
        setTimeout(() => navigate('/product'), 2000);
      } finally {
        setLoading(false); // Set loading false setelah data selesai dimuat
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
  
  // Validasi input
  if (!name || !price || !weight) {
    Swal.fire({
      icon: 'warning',
      title: 'Semua kolom wajib diisi!',
      text: 'Silakan periksa kolom input.'
    });
    return;
  }

  // Menyusun data yang akan dikirim
  const updatedProduct = {
    id: product.id,  // Menambahkan ID produk yang akan diedit
    namaSayur: name.trim(),
    hargaSayur: parseFloat(price),
    beratSayur: weight.trim(),
    idAdmin: idAdmin,  // Menambahkan ID admin
  };

  // Debug log untuk melihat bentuk data JSON
  console.log("Data produk yang dikirim:", updatedProduct);
  
  // Menambahkan gambar ke FormData jika ada
  const formData = new FormData();
  formData.append('product', JSON.stringify(updatedProduct));  // Mengirimkan JSON sebagai string
  if (image) {
    formData.append('file', image); // Menambahkan gambar dengan nama parameter 'file'
  }

  // Debug: log the FormData content
  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }

  try {
    const response = await axios.put(
      `http://localhost:9090/api/product/data/edit/${id}`,
      formData, // Data dalam format FormData
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Pastikan tipe ini
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
    console.error('Error response data:', error.response.data);  // Debug response error
    Swal.fire({
      icon: 'error',
      title: 'Gagal memperbarui produk',
      text: 'Silakan coba lagi nanti.',
    });
  }
};
  
  

  // Jika data produk sedang dimuat
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
