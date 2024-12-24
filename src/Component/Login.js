// src/Component/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2'; // 
import '../Css/Login.css';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Username:", username); // Debugging
        console.log("Password:", password); // Debugging
        
        // Dummy authentication logic
        if (username === 'admin' && password === 'admin') {
            onLogin(true); // Notify App about successful login
            navigate('/'); // Redirect to Dashboard
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
