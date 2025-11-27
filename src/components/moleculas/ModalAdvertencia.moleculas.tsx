import Modal from "./Modal.moleculas";
import { Typography, Box } from "@mui/material";
import { IModalAdvertencia } from "../../interface/reservas.interface";

const ModalAdvertencia = ({
  abrirModalEliminarReservas,
  setAbrirModalEliminarReservas,
  nombreCliente,
  onEliminar,
  loadingBtnEliminar,
}: IModalAdvertencia) => {
  return (
    <Modal
      open={abrirModalEliminarReservas}
      onGuardar={onEliminar}
      onCancelar={() => setAbrirModalEliminarReservas(false)}
      tituloJsx={
        <Typography sx={{ color: "red", fontSize: "20px" }}>
          {"Advertencia"}
        </Typography>
      }
      btnGuardar="Aceptar"
      mostrarBtnGuardar
      loadingBtnGuardar={loadingBtnEliminar}
      width={450}
    >
      <Box
        sx={{
          pt: 4,
          display: "grid",
          gap: 2, // espacio uniforme entre filas y columnas
        }}
      >
        <Typography sx={{ display: "flex", gap: 0.5 }}>
          <Box component="span" sx={{ fontWeight: 700 }}>
            Se va a eliminar a{" "}
            <span style={{ color: "rgba(8, 107, 181, 1)" }}>
              {nombreCliente}
            </span>{" "}
            del sistema ¿Está seguro?
          </Box>
        </Typography>
      </Box>
    </Modal>
  );
};
export default ModalAdvertencia;
