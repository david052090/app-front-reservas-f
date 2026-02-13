import Modal from "./Modal.moleculas";
import { Typography, Box } from "@mui/material";
import { IModalErrorAdvertencia } from "../../interface/general";

const ModalErrorAdvertencia = ({
  abrirModalModalErrorAdvertencia,
  setAbrirModalModalErrorAdvertencia,
  titulo,
  textBody,
}: IModalErrorAdvertencia) => {
  return (
    <Modal
      open={abrirModalModalErrorAdvertencia}
      onGuardar={() => setAbrirModalModalErrorAdvertencia(false)}
      onCancelar={() => setAbrirModalModalErrorAdvertencia(false)}
      tituloJsx={
        <Typography sx={{ color: "red", fontSize: "20px" }}>
          {titulo}
        </Typography>
      }
      btnGuardar="Entendido"
      mostrarBtnGuardar
      width={450}
    >
      <Box
        sx={{
          pt: 4,
          display: "grid",
          gap: 2,
        }}
      >
        <Typography sx={{ display: "flex", gap: 0.5 }}>
          <Box component="span" sx={{ fontWeight: 700 }}>
            {textBody}
          </Box>
        </Typography>
      </Box>
    </Modal>
  );
};
export default ModalErrorAdvertencia;
