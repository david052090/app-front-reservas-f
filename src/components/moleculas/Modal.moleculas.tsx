import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import "../../App.css";

interface IProps {
  titulo?: string;
  isSobrante?: boolean;
  children: React.ReactNode;
  onCancelar: () => void;
  onGuardar?: () => void;
  loadingBtnGuardar?: boolean;
  open: boolean;
  disabledBtnGuardar?: boolean;
  width?: number | string;
  height?: number | string;
  btnGuardar?: string;
  mostrarBtnCancelar?: boolean;
  mostrarBtnGuardar?: boolean;
  switchFooter?: React.ReactNode;
  tituloJsx?: React.ReactNode;
  subTitulo?: string;
  ocultarIconoX?: boolean;
  borderBottom?: string;
  paddingDialogActions?: string;
}

function Modal({
  titulo,
  isSobrante,
  children,
  onCancelar,
  onGuardar,
  loadingBtnGuardar,
  open,
  disabledBtnGuardar,
  width,
  height,
  btnGuardar,
  switchFooter,
  mostrarBtnCancelar,
  mostrarBtnGuardar,
  tituloJsx,
  subTitulo,
  ocultarIconoX,
  borderBottom,
  paddingDialogActions,
}: Readonly<IProps>) {
  const dishabilitarBtnGuardar = () => {
    if (disabledBtnGuardar || loadingBtnGuardar) return true;
    if (disabledBtnGuardar) return true;
    return false;
  };
  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth={true}
      scroll="body"
      PaperProps={{
        sx: {
          width: width ? width : "392px",
          height: height ? height : "auto",
          maxWidth: "972px",
        },
      }}
    >
      <DialogTitle
        color="primary"
        sx={{
          marginY: "2px",
          borderBottom: borderBottom ?? "1px solid rgba(0, 0, 0, 0.12)",
        }}
        fontWeight={500}
      >
        {tituloJsx && !titulo ? (
          tituloJsx
        ) : (
          <Typography
            color={!isSobrante ? "rgba(8, 107, 181, 1)" : "#000"}
            fontSize={20}
          >
            {titulo}
          </Typography>
        )}

        {!ocultarIconoX && (
          <IconButton
            aria-label="close"
            onClick={onCancelar}
            sx={{
              position: "absolute",
              right: "8px",
              top: isSobrante ? "14px" : "13px",
              color: (theme) => theme.palette.grey[700],
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
        {subTitulo && <Typography>{subTitulo}</Typography>}
      </DialogTitle>

      <DialogContent>{children}</DialogContent>

      <DialogActions
        sx={
          switchFooter
            ? { padding: "15px", justifyContent: "space-between" }
            : { padding: paddingDialogActions ?? "24px" }
        }
      >
        <Box>{switchFooter}</Box>
        <Box>
          {mostrarBtnCancelar && (
            <Button
              onClick={onCancelar}
              sx={{
                marginRight: "14px",
                padding: "6px, 16px, 6px, 16px",
                backgroundColor: "action.disabledBackground",
                color: "rgba(0, 0, 0, 0.6)",
                fontSize: "12px",
                width: "88px",
                height: "32px",
              }}
            >
              Cancelar
            </Button>
          )}
          {mostrarBtnGuardar && (
            <LoadingButton
              loading={loadingBtnGuardar || false}
              onClick={onGuardar}
              variant="contained"
              disabled={dishabilitarBtnGuardar()}
              sx={{
                width: "98px",
                height: "32px",
                padding: "6px, 16px, 6px, 16px",
                fontSize: "12px",
                fontWeight: "500",
                "&.Mui-disabled": {
                  color: !loadingBtnGuardar
                    ? "rgba(0, 0, 0, 0.26)"
                    : "rgba(255, 255, 255, 1)",
                  boxShadow: "none",
                  backgroundColor: !loadingBtnGuardar
                    ? "rgba(0, 0, 0, 0.12)"
                    : "rgba(8, 107, 181, 1)",
                  opacity: !loadingBtnGuardar ? 1 : 0.9,
                },
                ">.MuiLoadingButton-loadingIndicator": {
                  color: "#ffffff",
                },
              }}
            >
              {btnGuardar && !loadingBtnGuardar
                ? btnGuardar
                : !loadingBtnGuardar
                ? "Guardar"
                : loadingBtnGuardar}
            </LoadingButton>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
