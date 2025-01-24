import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from './Navbar';
import '../Css/Product.css';
import { API_PRODUCT } from '../utils/BaseUrl';

function Product({ isLoggedIn, onLoginToggle }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const adminData = JSON.parse(localStorage.getItem('adminData'));
      const idAdmin = adminData ? adminData.id : null;

      if (!idAdmin) {
        Swal.fire({ icon: 'warning', title: 'Silakan login terlebih dahulu!' });
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${API_PRODUCT}/getAllByAdmin/${idAdmin}`);
        setProducts(response.data);
      } catch (error) {
        Swal.fire({ icon: 'error', title: 'Gagal mengambil data produk', text: 'Silakan coba lagi nanti.' });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleDeleteProduct = async (id) => {
    const confirmation = await Swal.fire({
      title: 'Anda yakin?',
      text: 'Produk ini akan dihapus secara permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    });

    if (confirmation.isConfirmed) {
      try {
        await axios.delete(`${API_PRODUCT}/delete/${id}`);
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        Swal.fire({ icon: 'success', title: 'Produk berhasil dihapus!', timer: 1500, showConfirmButton: false });
      } catch (error) {
        Swal.fire({ icon: 'error', title: 'Gagal menghapus produk', text: 'Silakan coba lagi nanti.' });
      }
    }
  };

  if (loading) {
    return <div className="loading">Memuat data...</div>;
  }

  return (
    <div className="product-container">
      <Navbar isLoggedIn={isLoggedIn} onLoginToggle={onLoginToggle} />
      <div className="product-table-container">
        <div className="add-product-button">
          <h1 className="mine">Daftar Produk</h1>
          <Link to="/AddProduct">
            <button className="JAEMIN-btn">Tambah Produk</button>
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
                    <img
                      src={product.fotoUrl || 'path/to/placeholder.jpg'}  // Menampilkan foto produk jika ada, jika tidak ada, gunakan placeholder
                      alt={product.namaSayur || 'Gambar tidak tersedia'}
                      style={{ width: '110px' , height: '120px' }}
                    />
                  </td>
                  <td>{product.namaSayur}</td>
                  <td>{`Rp ${product.hargaSayur.toLocaleString()}`}</td>
                  <td>{`${product.beratSayur} kg`}</td>
                  <td>
                    <Link to={`/EditProduct/${product.id}`} className="edit-button">
                      Edit
                    </Link>
                    <button onClick={() => handleDeleteProduct(product.id)} className="delete-button">
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
