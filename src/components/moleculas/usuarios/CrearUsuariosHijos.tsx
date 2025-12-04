import { useEffect, useState } from "react";
import { Box, TextField, MenuItem } from "@mui/material";
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

  const {
    register,
    handleSubmit,
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
      const data = await obtenerRolesHijoApi();
      setRoles(data);
    } catch (error) {
      console.log(error);
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
              error={!!errors.id_rol}
              helperText={errors.id_rol?.message}
            >
              {roles.map((rol) => (
                <MenuItem key={rol.id} value={rol.id}>
                  {rol.nombre_rol}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>
    </Modal>
  );
};
export default ModalCrearUsuarioHijo;
