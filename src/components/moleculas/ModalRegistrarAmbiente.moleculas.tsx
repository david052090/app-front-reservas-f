import Modal from "./Modal.moleculas";
import { Box, TextField, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { registrarAmbiente } from "../../api/consultarAmbientes.ts";
import { useState } from "react";
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
import { IModalRegistroAmbiente } from "../../interface/formularios.interface";

const tiposReserva = [
  { value: "normal", label: "Normal" },
  { value: "vip", label: "VIP" },
];
interface IFormAmbiente {
  nombre_ambiente: string;
}
const ModalRegistrarAmbiente = ({
  setAbrirModalAmbiente,
  abrirModalAmbiente,
  actualizarData,
}: IModalRegistroAmbiente) => {
  const { enqueueSnackbar } = useSnackbar();
  const [cargandoBtn, setCargandoBtn] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormAmbiente>({
    defaultValues: {
      nombre_ambiente: "",
    },
  });
  const onSubmit = async (data: IFormAmbiente) => {
    const userId = localStorage.getItem("userId");
    try {
      setCargandoBtn(true);
      const respuesta = await registrarAmbiente(`${data.nombre_ambiente}`);
      console.log("respuesta", respuesta);
      enqueueSnackbar("Ambiente creado con exito.", {
        variant: "success",
      });
      setAbrirModalAmbiente(false);
      actualizarData();
      reset();
    } catch (err) {
      enqueueSnackbar("Error de conexión, por favor intente más tarde.", {
        variant: "warning",
      });
      console.log(err);
    } finally {
      setCargandoBtn(false);
    }
  };
  return (
    <Modal
      open={abrirModalAmbiente}
      onCancelar={() => {
        setAbrirModalAmbiente(false);
        reset();
      }}
      onGuardar={handleSubmit(onSubmit)}
      titulo="Registrar ambiente"
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
          pt: 4,
          display: "grid",
          gap: 2, // espacio uniforme entre filas y columnas
        }}
      >
        {/* 1ª fila */}
        <Controller
          name="nombre_ambiente"
          control={control}
          rules={{ required: "Nombre es obligatorio" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nombre"
              fullWidth
              error={!!errors.nombre_ambiente}
              helperText={errors.nombre_ambiente?.message}
            />
          )}
        />
      </Box>
    </Modal>
  );
};
export default ModalRegistrarAmbiente;
