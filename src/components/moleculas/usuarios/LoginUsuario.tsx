// Frontend: src/components/LoginUsuario.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LoginInputs } from "../../../interface/formularios.interface";
import { loginUsuario } from "../../../api/autenticacionUsuarios";
import logoReserva from "../../../assets/logo-reservas.png";
import { useAuthStore } from "../../../store/useAuthStore";

export const LoginUsuario = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>();

  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: LoginInputs) => {
    try {
      setServerError(null);

      const response = await loginUsuario(data);

      // Guardamos usuario en Zustand (la cookie ya está creada en backend)
      setUser(response.user);

      navigate("/reservas");
    } catch (err: any) {
      setServerError(err.response?.data?.error || "Error en el login");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 4 },
        width: { xs: "100%", sm: 400 },
        mx: "auto",
        mt: { xs: 4, sm: 8 },
        textAlign: "center",
      }}
    >
      <Box component="img" src={logoReserva} sx={{ width: 100 }} />

      <Typography variant="h5" sx={{ mb: 2 }}>
        Iniciar Sesión
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <TextField
          label="Correo electrónico"
          {...register("email", { required: "Correo obligatorio" })}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />

        <TextField
          label="Contraseña"
          type="password"
          {...register("password", { required: "Contraseña obligatoria" })}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />

        {serverError && <Typography color="error">{serverError}</Typography>}

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? "Validando..." : "Entrar"}
        </Button>
      </Box>
    </Paper>
  );
};
