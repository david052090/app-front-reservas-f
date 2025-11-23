import Modal from "./Modal.moleculas";
import { Typography, Box } from "@mui/material";
import { renderDetalle } from "../../utils/renderDetalle";
import { IModalDetalleReservas } from "../../interface/tiposReservas.interface";

const ModalDetalleReservas = ({
  abrirModalDetalleReservas,
  setAbrirModalDetalleReservas,
  detalle,
  nombreCliente,
}: IModalDetalleReservas) => {
  return (
    <Modal
      open={abrirModalDetalleReservas}
      onCancelar={() => setAbrirModalDetalleReservas(false)}
      titulo="Observaciones"
      btnGuardar="Aceptar"
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
            Cliente:
          </Box>
          <Box component="span" sx={{ fontWeight: 500 }}>
            {nombreCliente}
          </Box>
        </Typography>
        <Box>
          <Typography component="span" sx={{ fontWeight: 700 }}>
            Descripción:
          </Typography>
          <Typography sx={{ whiteSpace: "pre-line", fontSize: "14px" }}>
            {renderDetalle(detalle)}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};
export default ModalDetalleReservas;
