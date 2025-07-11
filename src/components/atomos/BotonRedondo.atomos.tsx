import { Button, CircularProgress } from "@mui/material";
import { IBotonRedondo } from "../../interface/general";

const BotonRedondo = ({
  texto,
  icono,
  onClick,
  disabled,
  isReporte,
  isDownloading,
  width,
}: IBotonRedondo) => {
  return (
    <Button
      size="small"
      sx={{
        borderRadius: "50px",
        height: "fitContent",
        boxShadow: "none",
        paddingRight: !isReporte ? "16px" : "",
        paddingTop: "6px",
        alignSelf: "center",
        width: width ? width : "97px",
      }}
      variant="outlined"
      startIcon={icono}
      onClick={() => onClick && onClick()}
      disabled={disabled}
    >
      {isDownloading ? (
        <CircularProgress size={20} style={{ color: "#fff" }} />
      ) : (
        texto
      )}
    </Button>
  );
};

export default BotonRedondo;
