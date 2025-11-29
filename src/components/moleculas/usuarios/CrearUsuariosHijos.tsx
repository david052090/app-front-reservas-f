import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {
  crearUsuarioHijoApi,
  obtenerRolesHijoApi,
} from "../../../api/crearUsuariosHijos";
import { useSnackbar } from "notistack";
import { IRol, ICrearUsuarioHijo } from "../../../interface/general";
import Modal from "../Modal.moleculas";
interface IModalCrearUsuarioHijo {
  abrirModalUsuarioHijo: boolean;
  setAbrirModalUsuarioHijo: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalCrearUsuarioHijo = ({
  abrirModalUsuarioHijo,
  setAbrirModalUsuarioHijo,
}: IModalCrearUsuarioHijo) => {
  const { enqueueSnackbar } = useSnackbar();
  const [roles, setRoles] = useState<IRol[]>([]);
  const [loadingRoles, setLoadingRoles] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<ICrearUsuarioHijo>({
    mode: "onChange",
  });

  // Cargar roles del backend
  useEffect(() => {
    obtenerRolesUsuarios();
  }, []);

  const obtenerRolesUsuarios = async () => {
    try {
      setLoadingRoles(true);
      const data = await obtenerRolesHijoApi();
      setRoles(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingRoles(false);
    }
  };

  const onSubmit = async (data: ICrearUsuarioHijo) => {
    try {
      await crearUsuarioHijoApi(data);
      enqueueSnackbar("Usuario creado con éxito", { variant: "success" });
    } catch (err: any) {
      enqueueSnackbar(err.response?.data?.error || "Error creando usuario", {
        variant: "error",
      });
    }
  };

  return (
    <Modal
      open={abrirModalUsuarioHijo}
      onCancelar={() => {
        setAbrirModalUsuarioHijo(false);
        reset();
      }}
      onGuardar={handleSubmit(onSubmit)}
      titulo="Registrar usuario"
      btnGuardar="Aceptar"
      width={600}
      mostrarBtnCancelar
      mostrarBtnGuardar
      disabledBtnGuardar={!isValid}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{
          pt: 2,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 2,
        }}
      >
        <TextField
          label="Nombre"
          {...register("nombre", { required: "Campo obligatorio" })}
          error={!!errors.nombre}
          helperText={errors.nombre?.message}
        />

        <TextField
          label="Correo"
          type="email"
          {...register("email", { required: "Campo obligatorio" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Contraseña"
          type="password"
          {...register("password", {
            required: "Campo obligatorio",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Controller
          name="id_rol"
          control={control}
          rules={{ required: "Ubicación es obligatoria" }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Rol usuario"
              fullWidth
              error={!!errors.rol}
              helperText={errors.rol?.message}
            >
              {roles.map((rol) => (
                <MenuItem key={rol.id} value={rol.id}>
                  {rol.nombre_rol}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        {/**<Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || loadingRoles}
          >
            {isSubmitting ? "Creando..." : "Crear Usuario"}
          </Button> */}
      </Box>
    </Modal>
  );
};
export default ModalCrearUsuarioHijo;
