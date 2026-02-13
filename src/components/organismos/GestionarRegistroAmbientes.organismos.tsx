import EncabezadoReservas from "../moleculas/EncabezadoReservas.moleculas";
import TablaGestionarRegistroAmbientes from "../moleculas/TablaGestionarRegistroAmbientes.moleculas";
import ModalRegistrarAmbiente from "../moleculas/ModalRegistrarAmbiente.moleculas";
import { useState, useEffect } from "react";
import { IListaAmbientes } from "../../interface/ambientes.interface";
import { getListaAmbientes } from "../../utils/obtenerAmbientes";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
const GestionarRegistroAmbientes = () => {
  const [abrirModalAmbiente, setAbrirModalAmbiente] = useState<boolean>(false);
  const [listarDataAmbientes, setListarDataAmbientes] = useState<
    IListaAmbientes[]
  >([]);
  const [cargando, setCargando] = useState<boolean>(false);
  useEffect(() => {
    listarAmbientes();
  }, []);

  const listarAmbientes = async () => {
    try {
      setCargando(true);
      const respuesta = await getListaAmbientes();
      setListarDataAmbientes(respuesta);
      console.log("respuesta", respuesta);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };
  return (
    <>
      <Box
        sx={{
          width: { xs: "auto", md: "800px" },
          maxWidth: { xs: "100vw", md: "none" },
          mx: 0,
          px: 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "37%" }}>
            <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
              Gestión de ambientes
            </Typography>
          </Box>
          <EncabezadoReservas
            setAbrirModalReservas={setAbrirModalAmbiente}
            actualizarTabla={() => listarAmbientes()}
          />
        </Box>

        <TablaGestionarRegistroAmbientes
          dataListadoAmbientes={listarDataAmbientes}
          cargando={cargando}
        />
      </Box>

      <ModalRegistrarAmbiente
        setAbrirModalAmbiente={setAbrirModalAmbiente}
        abrirModalAmbiente={abrirModalAmbiente}
        actualizarData={() => listarAmbientes()}
      />
    </>
  );
};
export default GestionarRegistroAmbientes;
