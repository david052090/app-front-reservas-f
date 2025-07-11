// este encabezado, contiene el titulo, el buscador retraible, el filtro estado y el boton redondo
// este componente se comporta como un encabezado base
import { Box } from "@mui/material";
import BotonRedondo from "../atomos/BotonRedondo.atomos";
import AddIcon from "@mui/icons-material/Add";
interface IEncabezadoReservas {
  setAbrirModalReservas: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function EncabezadoReservas({
  setAbrirModalReservas,
}: IEncabezadoReservas) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        paddingBottom: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: 1,
        }}
      >
        <BotonRedondo
          texto={"Nueva"}
          icono={<AddIcon />}
          onClick={() => setAbrirModalReservas(true)}
        />
      </Box>
    </Box>
  );
}
