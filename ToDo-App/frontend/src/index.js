import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx'; // Importa o AuthProvider
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider> {/* Envolve o App com o AuthProvider */}
      <App />
    </AuthProvider>
  </BrowserRouter>
);