// src/components/atomos/ProtegerRutas.atomos.tsx
import { useEffect, useState, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { obtenerUsuarioActual } from "../../api/autenticacionUsuarios";
import { useAuthStore } from "../../store/useAuthStore";

export const ProtegerRutas = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { user, setUser, clearUser } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const validarSesion = async () => {
      try {
        const usuario = await obtenerUsuarioActual();
        if (!isMounted) return;
        setUser(usuario);
      } catch (error) {
        if (!isMounted) return;
        clearUser();
      } finally {
        if (!isMounted) return;
        setChecking(false);
      }
    };

    validarSesion();

    return () => {
      isMounted = false;
    };
  }, [setUser, clearUser]);

  if (checking) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};
