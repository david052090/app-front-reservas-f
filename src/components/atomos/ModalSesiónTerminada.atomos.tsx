import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
interface IModalSesionTerminada {
  abrirModalSesionTerminada: boolean;
}
const ModalSesionTerminada = ({
  abrirModalSesionTerminada,
}: IModalSesionTerminada) => {
  const navigate = useNavigate();
  return (
    <Dialog
      open={abrirModalSesionTerminada}
      onClose={() => {}}
      aria-labelledby="session-expired-dialog-title"
      aria-describedby="session-expired-dialog-description"
    >
      <DialogTitle id="session-expired-dialog-title">
        Sesión expirada
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="session-expired-dialog-description">
          Tu sesión ha expirado. Por favor, inicia sesión de nuevo.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            navigate("/login");
          }}
          color="primary"
          autoFocus
        >
          Iniciar sesión
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ModalSesionTerminada;
