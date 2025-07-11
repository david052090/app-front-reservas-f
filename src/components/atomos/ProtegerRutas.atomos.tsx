import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
type ProtectedProps = { children: React.ReactNode };

export const ProtectedRoute: React.FC<ProtectedProps> = ({ children }) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    // No hay token, redirigir al login
    return <Navigate to="/login" replace />;
  }
  try {
    // Decodificar token para chequear expiración
    const decoded: any = (jwtDecode as any).default
      ? (jwtDecode as any).default(token)
      : (jwtDecode as any)(token);
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      // Token expirado
      localStorage.removeItem("authToken");
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    // Token inválido
    localStorage.removeItem("authToken");
    return <Navigate to="/login" replace />;
  }
  return children;
};
