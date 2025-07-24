import Modal from "./Modal.moleculas";
import { Box, TextField, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { dataRegistrarReserva } from "../../api/consultarReservas.ts";
import { useState, useEffect } from "react";
import {
  FormValues,
  IModalRegistroReservas,
} from "../../interface/formularios.interface";
import { useSnackbar } from "notistack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { UBICACIONES } from "../../constants/global.constants";
import { getListaAmbientes } from "../../utils/obtenerAmbientes";
import { ITiposAmbientes } from "../../interface/formularios.interface";
import { obtenerTiposReserva } from "../../api/consultarTipoReservas.ts";
const ModalRegistroReservas = ({
  setAbrirModalReservas,
  abrirModalReservas,
  actualizarData,
}: IModalRegistroReservas) => {
  const { enqueueSnackbar } = useSnackbar();
  const [cargandoBtn, setCargandoBtn] = useState<boolean>(false);
  const [listarTipoAmbientes, setListarTipoAmbientes] = useState<
    ITiposAmbientes[]
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
      cantidad_personas: null,
      fecha: null,
      hora: null,
      tipo_reserva: "",
      numero_mesa: null,
      estado_reserva: true ? 1 : 0,
      ubicacion: "",
      observacion: "",
    },
  });

  useEffect(() => {
    if (abrirModalReservas) {
      listarAmbientes();
      listarDataTipoReservas();
    }
  }, [abrirModalReservas]);

  const onSubmit = async (data: FormValues) => {
    const userId = localStorage.getItem("userId");
    try {
      setCargandoBtn(true);
      const dataResponse = await dataRegistrarReserva({
        ...data,
        userId,
        fecha: dayjs(data.fecha).format("YYYY-MM-DD"),
        hora: dayjs(data.hora).format("HH:mm"),
      });
      console.log("dataResponse", dataResponse);
      setAbrirModalReservas(false);
      actualizarData();
      reset();
      enqueueSnackbar("Reserva creada con exito.", {
        variant: "success",
      });
    } catch (error) {
      console.log("error", error);
      enqueueSnackbar("Error de conexión, por favor intente más tarde.", {
        variant: "warning",
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

        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <Controller
            name="fecha"
            control={control}
            rules={{ required: "Fecha es obligatoria" }}
            render={({ field }) => (
              <DatePicker
                label="Fecha"
                value={field.value}
                onChange={(date) => field.onChange(date)}
                minDate={dayjs()}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.fecha,
                    helperText: errors.fecha?.message,
                  },
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
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
                value={field.value}
                onChange={(time) => field.onChange(time)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.hora,
                    helperText: errors.hora?.message,
                  },
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
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
      </Box>
    </Modal>
  );
};
export default ModalRegistroReservas;
