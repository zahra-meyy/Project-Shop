import React from 'react';
import ReactDOM from 'react-dom/client';  // Impor ReactDOM dari 'react-dom/client'
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Buat root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);