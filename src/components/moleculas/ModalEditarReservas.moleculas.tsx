import Modal from "./Modal.moleculas";
import {
  Box,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { actualizarReserva } from "../../api/consultarReservas";
import { getListaAmbientes } from "../../utils/obtenerAmbientes";
import {
  IModalEditarReserva,
  FormValues,
} from "../../interface/formularios.interface";
import { obtenerTiposReserva } from "../../api/consultarTipoReservas.ts";
import {
  ITiposAmbientesReservas,
  ITiposReservas,
} from "../../interface/formularios.interface";

const ModalEditarReserva = ({
  abrirModalEditar,
  setAbrirModalEditar,
  reservaEditar,
  actualizarData,
  setSelected,
  setSelectedData,
}: IModalEditarReserva) => {
  const { enqueueSnackbar } = useSnackbar();
  const [cargandoBtn, setCargandoBtn] = useState<boolean>(false);
  const [listarTipoAmbientes, setListarTipoAmbientes] = useState<
    ITiposAmbientesReservas[]
  >([]);
  const [listarTipoReservas, setListarTipoReservas] = useState<
    ITiposReservas[]
  >([]);
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
      fecha: null,
      hora: null,
      tipo_reserva: "",
      numero_mesa: 0,
      estado_reserva: true ? 1 : 0,
      ubicacion: "",
      observacion: "",
    },
  });

  useEffect(() => {
    if (reservaEditar) {
      reset({
        ...reservaEditar,
        fecha: dayjs(reservaEditar.fecha),
        hora: dayjs(reservaEditar.hora, "hh:mm A"),
        estado_reserva: reservaEditar.estado_reserva,
      });
      listarAmbientes();
      listarDataTipoReservas();
    }
  }, [reservaEditar]);

  const onSubmit = async (data: FormValues) => {
    try {
      setCargandoBtn(true);
      const userId = localStorage.getItem("userId");

      await actualizarReserva({
        ...data,
        id: reservaEditar?.id as number, // forzamos que no sea undefined
        fecha: dayjs(data.fecha).format("YYYY-MM-DD"),
        hora: dayjs(data.hora).format("hh:mm A"),
        estado_reserva: data.estado_reserva,
      });

      enqueueSnackbar("Reserva actualizada con éxito.", {
        variant: "success",
      });

      actualizarData();
      setAbrirModalEditar(false);
      reset();
      setSelected([]);
      setSelectedData([]);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error al actualizar la reserva", {
        variant: "error",
      });
    } finally {
      setCargandoBtn(false);
    }
  };

  const listarAmbientes = async () => {
    try {
      const respuesta = await getListaAmbientes();
      setListarTipoAmbientes(respuesta);
      console.log("respuesta", respuesta);
    } catch (error) {
      console.log(error);
    }
  };
  const listarDataTipoReservas = async () => {
    try {
      const respuesta = await obtenerTiposReserva();
      setListarTipoReservas(respuesta);
      console.log("respuesta", respuesta);
    } catch (error) {
      console.log(error);
    }
  };
  const cancelar = () => {
    setAbrirModalEditar(false);
    reset();
    setSelected([]);
    setSelectedData([]);
  };
  return (
    <Modal
      open={abrirModalEditar}
      onCancelar={cancelar}
      onGuardar={handleSubmit(onSubmit)}
      titulo="Editar reserva"
      btnGuardar="Guardar"
      width={600}
      mostrarBtnCancelar
      mostrarBtnGuardar
      loadingBtnGuardar={cargandoBtn}
    >
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          pt: 2,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 2,
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

        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <Controller
            name="fecha"
            control={control}
            rules={{ required: "Fecha es obligatoria" }}
            render={({ field }) => (
              <DatePicker
                label="Fecha"
                value={dayjs(field.value)}
                onChange={(date) => field.onChange(date)}
                minDate={dayjs()}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.fecha,
                    helperText: errors.fecha?.message,
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>

        {/* 3ª fila */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="hora"
            control={control}
            rules={{ required: "Hora es obligatoria" }}
            render={({ field }) => (
              <TimePicker
                label="Hora"
                value={dayjs(field.value)}
                onChange={(time) => field.onChange(time)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.hora,
                    helperText: errors.hora?.message,
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>

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
              {listarTipoReservas.map((opt) => (
                <MenuItem
                  key={opt.nombre_tipo_reserva}
                  value={opt.nombre_tipo_reserva}
                >
                  {opt.nombre_tipo_reserva}
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
        <Controller
          name="ubicacion"
          control={control}
          rules={{ required: "Ubicación es obligatoria" }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Ubicación"
              fullWidth
              error={!!errors.ubicacion}
              helperText={errors.ubicacion?.message}
            >
              {listarTipoAmbientes.map((opt) => (
                <MenuItem key={opt.nombre_ambiente} value={opt.nombre_ambiente}>
                  {opt.nombre_ambiente}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="observacion"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Observación"
              multiline
              rows={3}
              fullWidth
            />
          )}
        />
        <Controller
          name="estado_reserva"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  color="primary"
                />
              }
              label={field.value ? "Confirmada" : "Cancelada"}
            />
          )}
        />
      </Box>
    </Modal>
  );
};

export default ModalEditarReserva;
