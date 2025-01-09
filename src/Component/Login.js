import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import ikon mata dari react-icons
import axios from 'axios'; // Import axios
import '../Css/Login.css'; // Import file CSS
import { API_LOGIN } from '../utils/BaseUrl';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Untuk menyimpan error login jika ada
    const [showPassword, setShowPassword] = useState(false); // State untuk show/hide password
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Data login yang akan dikirimkan ke API
        const loginData = {
            email,
            password,
        };

        try {
            // Mengirimkan permintaan POST ke API login dengan axios
            const response = await axios.post(API_LOGIN, loginData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Mengecek apakah request berhasil
            const data = response.data;

            // Menyimpan token ke localStorage
            localStorage.setItem("authToken", data.token); // Simpan token
            localStorage.setItem("idAdmin", data.adminData.id); // Simpan ID adminData
            localStorage.setItem("adminData", JSON.stringify(data.adminData)); 

            // Jika login berhasil, simpan data (misalnya token) atau status login
            console.log('Login berhasil:', data);

            // Redirect ke halaman produk setelah login sukses
            navigate('/Product');
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Login gagal, silakan coba lagi.');
            } else {
                setError('Terjadi kesalahan saat login. Silakan coba lagi.');
            }
            console.error('Error:', error);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-title">Login</h2>

                {/* Menampilkan pesan error jika login gagal */}
                {error && <div className="error-message">{error}</div>}

                <div className="input-group">
                    <label htmlFor="email" className="input-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password" className="input-label">Password:</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'} 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input-field"
                        />
                        <button
                            type="button"
                            className="show-password-button"
                            onClick={() => setShowPassword(!showPassword)} // Toggle showPassword
                        >
                            {/* Menampilkan ikon mata */}
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <button type="submit" className="login-button">Login</button>
                              
                <p className="text-center">
                    belum punya akun?{" "}
                    <a href="/register" className="text-primary">Daftar</a>
                </p>

            </form>
        </div>
    );
};

export default Login;
