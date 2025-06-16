import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Dashboard from './pages/Dashboard.js';
import PublicTasks from './pages/PublicTasks.js';
import ForgotPassword from './pages/ForgotPassword.js'; // Importa a nova página
import ResetPassword from './pages/ResetPassword.js'; // Importa a página de redefinição de senha
import PrivateRoute from './components/PrivateRoute.jsx'; // Importa o PrivateRoute


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Nova rota */}
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/public-tasks" element={<PublicTasks />} />
    </Routes>
  );
}

export default App;