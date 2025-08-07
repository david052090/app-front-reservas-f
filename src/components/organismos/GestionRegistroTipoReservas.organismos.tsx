import EncabezadoReservas from "../moleculas/EncabezadoReservas.moleculas";
import TablaGestionarTiposReservas from "../moleculas/TablaGestionarTiposReservas.moleculas";
import { useState, useEffect } from "react";
import ModalRegistrarTipoReservas from "../moleculas/ModalRegistrarTipoReservas.moleculas";
import { obtenerTiposReserva } from "../../api/consultarTipoReservas.ts";
import { IListaTiposReservas } from "../../interface/tiposReservas.interface";
import { Box } from "@mui/material";
const GestionRegistroTipoReservas = () => {
  const [abrirModalTipoReservas, setAbrirModalTipoReservas] =
    useState<boolean>(false);
  const [listarTipoReservas, setListarTipoReservas] = useState<
    IListaTiposReservas[]
  >([]);
  const [cargando, setCargando] = useState<boolean>(false);

  useEffect(() => {
    listarDataTipoReservas();
  }, []);

  const listarDataTipoReservas = async () => {
    try {
      setCargando(true);
      const respuesta = await obtenerTiposReserva();
      setListarTipoReservas(respuesta);
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
          width: { xs: "auto", md: "700px" },
          maxWidth: { xs: "100vw", md: "none" },
          mx: 0,
          px: 0,
        }}
      >
        <EncabezadoReservas
          setAbrirModalReservas={setAbrirModalTipoReservas}
          actualizarTabla={() => listarDataTipoReservas()}
        />
        <TablaGestionarTiposReservas
          dataListadoTiposReservas={listarTipoReservas}
          cargando={cargando}
        />
      </Box>

      <ModalRegistrarTipoReservas
        setAbrirModalTipoReservas={setAbrirModalTipoReservas}
        abrirModalTipoReservas={abrirModalTipoReservas}
        actualizarData={() => listarDataTipoReservas()}
      />
    </>
  );
};
export default GestionRegistroTipoReservas;
