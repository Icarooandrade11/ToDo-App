import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth }  from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  // Se não houver usuário logado, manda pro login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}