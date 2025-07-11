// Frontend: src/components/RegistroUsuario.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography, Paper, Link } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { FormInputsRegistrar } from "../../../interface/formularios.interface";

const RegistroUsuario = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputsRegistrar>();
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: FormInputsRegistrar) => {
    console.log("data", data);
    try {
      setServerError(null);
      const response = await axios.post(
        "http://localhost:3000/api/register",
        data
      );
      if (response.status === 201) {
        setServerError("Error en el registro");
        navigate("/login");
      }
    } catch (err: any) {
      setServerError(err.response?.data?.error || "Error en el registro");
      console.log("err.response", err);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ p: 4, maxWidth: 800, width: "400px", mx: "auto", mt: 8 }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Registro de Restaurante
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
          {...register("nombre", { required: "Nombre es obligatorio" })}
          error={!!errors.nombre}
          helperText={errors.nombre?.message}
          fullWidth
        />
        <TextField
          label="Nombre restaurante"
          {...register("nombre_restaurante", {
            required: "Nombre es obligatorio",
          })}
          error={!!errors.nombre_restaurante}
          helperText={errors.nombre_restaurante?.message}
          fullWidth
        />
        <TextField
          label="NIT del restaurante"
          {...register("nit", { required: "NIT es obligatorio" })}
          error={!!errors.nit}
          helperText={errors.nit?.message}
          fullWidth
        />
        <TextField
          label="Correo"
          type="email"
          {...register("email", {
            required: "Correo es obligatorio",
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: "Correo inválido",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          label="Contraseña"
          type="password"
          {...register("password", {
            required: "Contraseña es obligatoria",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />
        {serverError && <Typography color="error">{serverError}</Typography>}
        <Button
          type="submit"
          variant="contained"
          //disabled={isSubmitting || isSubmitSuccessful}
        >
          {isSubmitting ? "Registrando..." : "Registrar"}
        </Button>
      </Box>
      <Box textAlign="center" mt={2}>
        <Typography variant="body2">
          ¿Ya tienes una cuenta?{" "}
          <Link component={RouterLink} to="/login">
            Iniciar sesión
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
};

export default RegistroUsuario;
