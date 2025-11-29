// src/components/atomos/LoggedOutOnlyRoute.tsx
import { useEffect, useState, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { obtenerUsuarioActual } from "../../api/autenticacionUsuarios";
import { useAuthStore } from "../../store/useAuthStore";

export const LoggedOutOnlyRoute = ({ children }: { children: ReactNode }) => {
  const { user, setUser, clearUser } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const validarSesion = async () => {
      try {
        const usuario = await obtenerUsuarioActual();
        if (!isMounted) return;
        setUser(usuario); // si hay sesión → redirigimos abajo
      } catch (err) {
        if (!isMounted) return;
        clearUser(); // no hay sesión → permitir login
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

  if (user) {
    return <Navigate to="/reservas" replace />;
  }

  return children;
};
