import Modal from "./Modal.moleculas";
import { Box, TextField, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { dataRegistrarReserva } from "../../api/consultarReservas.ts";
import {
  FormValues,
  IModalRegistroReservas,
} from "../../interface/formularios.interface";

const tiposReserva = [
  { value: "normal", label: "Normal" },
  { value: "vip", label: "VIP" },
];
const ModalRegistroReservas = ({
  setAbrirModalReservas,
  abrirModalReservas,
}: IModalRegistroReservas) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      nombre_cliente: "",
      celular: "",
      cantidad_personas: 0,
      fecha: "",
      hora: "",
      tipo_reserva: "",
      numero_mesa: 0,
      estado_reserva: "Confirmada",
    },
  });
  const onSubmit = async (data: FormValues) => {
    const userId = localStorage.getItem("userId");
    console.log("userId", userId);
    try {
      const dataResponse = await dataRegistrarReserva({ ...data, userId });
      console.log("dataResponse", dataResponse);
    } catch (error) {
      console.log("error", error);
    }
    //setAbrirModalReservas(false);
  };
  return (
    <Modal
      open={abrirModalReservas}
      onCancelar={() => {
        setAbrirModalReservas(false);
        reset();
      }}
      onGuardar={handleSubmit(onSubmit)}
      titulo="Registrar reserva"
      btnGuardar="Aceptar"
      width={600}
      mostrarBtnCancelar
      mostrarBtnGuardar
      loadingBtnGuardar={false}
    >
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          pt: 2,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 2, // espacio uniforme entre filas y columnas
        }}
      >
        {/* 1ª fila */}
        <Controller
          name="nombre_cliente"
          control={control}
          rules={{ required: "Nombre es obligatorio" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nombre"
              fullWidth
              error={!!errors.nombre_cliente}
              helperText={errors.nombre_cliente?.message}
            />
          )}
        />

        <Controller
          name="celular"
          control={control}
          rules={{
            required: "Celular es obligatorio",
            pattern: { value: /^[0-9]+$/, message: "Solo números" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Celular"
              fullWidth
              error={!!errors.celular}
              helperText={errors.celular?.message}
            />
          )}
        />

        {/* 2ª fila */}
        <Controller
          name="cantidad_personas"
          control={control}
          rules={{
            required: "Cantidad es obligatoria",
            min: { value: 1, message: "Debe ser al menos 1" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Cantidad de personas"
              type="number"
              inputProps={{ min: 1 }}
              fullWidth
              error={!!errors.cantidad_personas}
              helperText={errors.cantidad_personas?.message}
            />
          )}
        />

        <Controller
          name="fecha"
          control={control}
          rules={{ required: "Fecha es obligatoria" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Fecha"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              error={!!errors.fecha}
              helperText={errors.fecha?.message}
            />
          )}
        />

        {/* 3ª fila */}
        <Controller
          name="hora"
          control={control}
          rules={{ required: "Hora es obligatoria" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Hora"
              type="time"
              InputLabelProps={{ shrink: true }}
              fullWidth
              error={!!errors.hora}
              helperText={errors.hora?.message}
            />
          )}
        />

        <Controller
          name="tipo_reserva"
          control={control}
          rules={{ required: "Tipo de reserva es obligatorio" }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Tipo de reserva"
              fullWidth
              error={!!errors.tipo_reserva}
              helperText={errors.tipo_reserva?.message}
            >
              {tiposReserva.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="numero_mesa"
          control={control}
          rules={{
            required: "Número de mesa es obligatorio",
            min: { value: 1, message: "Debe ser al menos 1" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Número de mesa"
              type="number"
              inputProps={{ min: 1 }}
              fullWidth
              error={!!errors.numero_mesa}
              helperText={errors.numero_mesa?.message}
            />
          )}
        />
      </Box>
    </Modal>
  );
};
export default ModalRegistroReservas;
