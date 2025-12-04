import Modal from "./Modal.moleculas";
import { Typography, Box } from "@mui/material";
import { IModalDetalleUsuarios } from "../../interface/reservas.interface";
import formatearFecha from "../../utils/formatearFecha";

const ModalDetalleUsuario = ({
  abrirModalDetalleUsuarios,
  setAbrirModalDetalleUsuarios,
  dataModalDetalleUsuarios,
}: IModalDetalleUsuarios) => {
  return (
    <Modal
      open={abrirModalDetalleUsuarios}
      onCancelar={() => setAbrirModalDetalleUsuarios(false)}
      titulo="Detalle usuario registrador"
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
        <Box>
          <Typography component="span" sx={{ fontWeight: 700 }}>
            Registra:
          </Typography>
          <Typography sx={{ whiteSpace: "pre-line", fontSize: "14px" }}>
            {dataModalDetalleUsuarios?.usuario_nombre}
          </Typography>
        </Box>
        <Box>
          <Typography component="span" sx={{ fontWeight: 700 }}>
            Correo:
          </Typography>
          <Typography sx={{ whiteSpace: "pre-line", fontSize: "14px" }}>
            {dataModalDetalleUsuarios?.usuario_email}
          </Typography>
        </Box>
        <Box>
          <Typography component="span" sx={{ fontWeight: 700 }}>
            Fecha registro:
          </Typography>
          <Typography sx={{ whiteSpace: "pre-line", fontSize: "14px" }}>
            {formatearFecha(dataModalDetalleUsuarios?.created_at ?? "", false)}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};
export default ModalDetalleUsuario;
