import { MaterialDesignContent, SnackbarProvider } from "notistack";
import { styled } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: "#006db0",
    color: "#ffffff",
    fontFamily: "Roboto, sans-serif",
  },
  "&.notistack-MuiContent-warning": {
    backgroundColor: "#F85B30",
    color: "#fff",
    fontFamily: "Roboto, sans-serif",
  },
  "&.notistack-MuiContent-info": {
    backgroundColor: "#F2F2F2",
    color: "#5a5a5a",
    fontFamily: "Roboto, sans-serif",
  },
}));

const SnackbarAtom = ({ children }: { children: React.ReactNode }) => {
  return (
    <SnackbarProvider
      autoHideDuration={5000}
      Components={{
        success: StyledMaterialDesignContent,
        warning: StyledMaterialDesignContent,
        info: StyledMaterialDesignContent,
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      iconVariant={{
        success: (
          <CheckCircleOutlineIcon sx={{ width: "24px", marginRight: "8px" }} />
        ),
        warning: (
          <InfoOutlinedIcon sx={{ width: "24px", marginRight: "8px" }} />
        ),
        info: <AccessTimeIcon sx={{ width: "24px", marginRight: "8px" }} />,
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default SnackbarAtom;
