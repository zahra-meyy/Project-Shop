import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faKey,
  faEyeSlash,
  faEye,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import "../Css/Register.css";
import { API_REGISTER } from "../utils/BaseUrl";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi Username (tidak boleh kosong dan hanya huruf/angka)
    if (!/^[a-zA-Z0-9]{3,20}$/.test(username)) {
      Swal.fire({
        icon: "error",
        title: "Username tidak valid",
        text: "Username hanya boleh terdiri dari huruf atau angka, dengan panjang 3-20 karakter.",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    // Validasi Email (harus sesuai format email)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Email tidak valid",
        text: "Masukkan email yang benar.",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    // Validasi Password (minimal 8 karakter, huruf besar, kecil, dan angka)
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      Swal.fire({
        icon: "error",
        title: "Password tidak valid",
        text: "Password harus memiliki minimal 8 karakter, satu huruf besar, satu huruf kecil, dan satu angka.",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    try {
      // Mengirim data ke server menggunakan Axios
      const response = await axios.post(`${API_REGISTER}`, {
        username,
        email,
        password,
      });

      // Menangani respons dari server
      Swal.fire({
        icon: "success",
        title: "Registrasi berhasil!",
        text: `Akun untuk ${response.data.username} berhasil dibuat.`,
        showConfirmButton: true,
      });

      // Redirect setelah sukses
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        Swal.fire({
          icon: "error",
          title: "Terjadi kesalahan saat registrasi.",
          text: "Coba lagi nanti.",
          showConfirmButton: true,
        });
      }
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setErrorMessage("");
  };

  return (
    <div className="zahra">
      <div className="mark">
        <h2 className="card-title">Register</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <div className="input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={handleInputChange(setUsername)}
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={handleInputChange(setEmail)}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faKey} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={handleInputChange(setPassword)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100 mb-3">Register</button>

          <p className="text-center">
            Sudah punya akun?{" "}
            <a href="/login" className="text-primary">Masuk</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
