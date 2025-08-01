import Modal from "./Modal.moleculas";
import { Box, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { registrarTipoReserva } from "../../api/consultarTipoReservas.ts";
import { useState } from "react";
import { useSnackbar } from "notistack";
import "dayjs/locale/es";
import { IModalRegistroTipoReservas } from "../../interface/formularios.interface";

interface IFormTipoReservas {
  nombre_tipo_reserva: string;
}
const ModalRegistrarTipoReservas = ({
  setAbrirModalTipoReservas,
  abrirModalTipoReservas,
  actualizarData,
}: IModalRegistroTipoReservas) => {
  const { enqueueSnackbar } = useSnackbar();
  const [cargandoBtn, setCargandoBtn] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormTipoReservas>({
    defaultValues: {
      nombre_tipo_reserva: "",
    },
  });
  const onSubmit = async (data: IFormTipoReservas) => {
    try {
      setCargandoBtn(true);
      const respuesta = await registrarTipoReserva(
        `${data.nombre_tipo_reserva}`
      );
      console.log("respuesta", respuesta);
      enqueueSnackbar("Tipo reserva creada con exito.", {
        variant: "success",
      });
      setAbrirModalTipoReservas(false);
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
      open={abrirModalTipoReservas}
      onCancelar={() => {
        setAbrirModalTipoReservas(false);
        reset();
      }}
      onGuardar={handleSubmit(onSubmit)}
      titulo="Registrar tipo de reserva"
      btnGuardar="Aceptar"
      width={600}
      mostrarBtnCancelar
      mostrarBtnGuardar
      loadingBtnGuardar={cargandoBtn}
    >
      <Box
        sx={{
          pt: 4,
          display: "grid",
          gap: 2, // espacio uniforme entre filas y columnas
        }}
      >
        {/* 1ª fila */}
        <Controller
          name="nombre_tipo_reserva"
          control={control}
          rules={{ required: "Nombre es obligatorio" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nombre tipo"
              fullWidth
              error={!!errors.nombre_tipo_reserva}
              helperText={errors.nombre_tipo_reserva?.message}
            />
          )}
        />
      </Box>
    </Modal>
  );
};
export default ModalRegistrarTipoReservas;
