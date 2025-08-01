import EncabezadoReservas from "../moleculas/EncabezadoReservas.moleculas";
import TablaGestionarTiposReservas from "../moleculas/TablaGestionarTiposReservas.moleculas";
import { useState, useEffect } from "react";
import ModalRegistrarTipoReservas from "../moleculas/ModalRegistrarTipoReservas.moleculas";
import { obtenerTiposReserva } from "../../api/consultarTipoReservas.ts";
import { IListaTiposReservas } from "../../interface/tiposReservas.interface";
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
      <EncabezadoReservas
        setAbrirModalReservas={setAbrirModalTipoReservas}
        actualizarTabla={() => listarDataTipoReservas()}
      />
      <TablaGestionarTiposReservas
        dataListadoTiposReservas={listarTipoReservas}
        cargando={cargando}
      />
      <ModalRegistrarTipoReservas
        setAbrirModalTipoReservas={setAbrirModalTipoReservas}
        abrirModalTipoReservas={abrirModalTipoReservas}
        actualizarData={() => listarDataTipoReservas()}
      />
    </>
  );
};
export default GestionRegistroTipoReservas;
