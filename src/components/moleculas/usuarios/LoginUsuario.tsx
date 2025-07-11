// Frontend: src/components/LoginUsuario.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography, Paper, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginInputs } from "../../../interface/formularios.interface";
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
      const response = await axios.post(
        "http://localhost:3000/api/login",
        data
      );
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("authToken", token);
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
      sx={{ p: 4, maxWidth: 400, width: "400px", mx: "auto", mt: 8 }}
    >
      <Typography variant="h5" gutterBottom>
        Login de Restaurante
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <TextField
          label="Nombre del restaurante"
          {...register("nombre_restaurante", {
            required: "Nombre es obligatorio",
          })}
          error={!!errors.nombre_restaurante}
          helperText={errors.nombre_restaurante?.message}
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
      <Box textAlign="center" mt={2}>
        <Typography variant="body2">
          ¿No tienes una cuenta?{" "}
          <Link component={RouterLink} to="/register">
            Registrar
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
};
