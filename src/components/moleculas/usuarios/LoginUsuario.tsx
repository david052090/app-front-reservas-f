// Frontend: src/components/LoginUsuario.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
//import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginInputs } from "../../../interface/formularios.interface";
import { loginUsuario } from "../../../api/autenticacionUsuarios.ts";
import logoReserva from "../../../assets/logo-reservas.png";

export const LoginUsuario = () => {
  const navigate = useNavigate();
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
      if (response.token) {
        localStorage.setItem("authToken", response.token); // 👈 cambia aquí
        navigate("/reservas");
      } else {
        setServerError("Credenciales inválidas");
      }
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
        maxWidth: 400,
        mx: "auto",
        mt: { xs: 4, sm: 8 },
        textAlign: "center",
      }}
    >
      <Box
        component="img"
        src={logoReserva}
        alt="Logo reservas"
        sx={{ width: 100 }}
      />
      <Typography variant="h5" gutterBottom sx={{ marginBottom: "20px" }}>
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
          label="Nombre usuario"
          {...register("nombre", {
            required: "Nombre es obligatorio",
          })}
          error={!!errors.nombre}
          helperText={errors.nombre?.message}
          fullWidth
        />
        <TextField
          label="Contraseña"
          type="password"
          {...register("password", { required: "Contraseña es obligatoria" })}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />
        {serverError && <Typography color="error">{serverError}</Typography>}
        <Button type="submit" variant="contained">
          {isSubmitting ? "Validando..." : "Entrar"}
        </Button>
      </Box>
    </Paper>
  );
};
