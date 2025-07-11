import TablaReservas from "../moleculas/TablaReservas.moleculas";
import EncabezadoReservas from "../moleculas/EncabezadoReservas.moleculas";
import { useEffect, useState } from "react";
import { gestionarListadoReservas } from "../../api/consultarReservas.ts";
import ModalRegistroReservas from "../moleculas/ModalRegistroReservas.moleculas";
import { IDataReservas } from "../../interface/reservas.interface";
const GestionReservas = () => {
  const [listarReservas, setListarReservas] = useState<IDataReservas[]>([]);
  const [abrirModalReservas, setAbrirModalReservas] = useState<boolean>(false);
  useEffect(() => {
    getListarReservas();
  }, []);
  const getListarReservas = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const dataListado = await gestionarListadoReservas(`${8}`);
      setListarReservas(dataListado.reservas);
      console.log("dataListado", dataListado);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <EncabezadoReservas setAbrirModalReservas={setAbrirModalReservas} />
      <TablaReservas dataListadoReservas={listarReservas} />;
      <ModalRegistroReservas
        setAbrirModalReservas={setAbrirModalReservas}
        abrirModalReservas={abrirModalReservas}
      />
    </>
  );
};
export default GestionReservas;
