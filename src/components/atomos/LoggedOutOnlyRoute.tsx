// src/components/atomos/LoggedOutOnlyRoute.tsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setAuthFromStorage } from "../../store/authSlice";
import { esTokenValido } from "../../utils/esTokenValido";
import { Box, CircularProgress } from "@mui/material";

type Props = { children: React.ReactNode };

export const LoggedOutOnlyRoute: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      setChecking(false);
      return;
    }
    const token = localStorage.getItem("authToken");
    if (token && esTokenValido(token)) {
      dispatch(setAuthFromStorage(token));
    }
    setChecking(false);
  }, [dispatch, isAuthenticated]);

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

  // Si ya está autenticado, fuera del login
  if (isAuthenticated) {
    return <Navigate to="/reservas" replace />;
  }

  return <>{children}</>;
};
