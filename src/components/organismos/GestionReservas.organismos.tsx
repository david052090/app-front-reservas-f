import TablaReservas from "../moleculas/TablaReservas.moleculas";
import EncabezadoReservas from "../moleculas/EncabezadoReservas.moleculas";
import { useEffect, useState } from "react";
import { gestionarListadoReservas } from "../../api/consultarReservas.ts";
import ModalRegistroReservas from "../moleculas/ModalRegistroReservas.moleculas";
import { IDataReservas } from "../../interface/reservas.interface";
import ModalEditarReserva from "../moleculas/ModalEditarReservas.moleculas";
const GestionReservas = () => {
  const [listarReservas, setListarReservas] = useState<IDataReservas[]>([]);
  const [abrirModalReservas, setAbrirModalReservas] = useState<boolean>(false);
  const [cargando, setCargando] = useState<boolean>(false);
  const [abrirModalEditar, setAbrirModalEditar] = useState<boolean>(false);
  const [reservaEditar, setReservaEditar] = useState<IDataReservas | null>(
    null
  );
  const [selected, setSelected] = useState<number[]>([]);
  const [selectedData, setSelectedData] = useState<IDataReservas[]>([]);
  const [busqueda, setBusqueda] = useState("");
  useEffect(() => {
    getListarReservas();
  }, []);
  const getListarReservas = async () => {
    try {
      setCargando(true);
      const userId = localStorage.getItem("userId");
      const dataListado = await gestionarListadoReservas(userId);
      setListarReservas(dataListado.reservas);
      console.log("dataListado", dataListado);
    } catch (error) {
      console.log("error", error);
    } finally {
      setCargando(false);
    }
  };
  const reservasFiltradas = listarReservas.filter((r) =>
    r.nombre_cliente.toLowerCase().includes(busqueda.toLowerCase())
  );
  return (
    <>
      <EncabezadoReservas
        setAbrirModalReservas={setAbrirModalReservas}
        actualizarTabla={() => getListarReservas()}
        filtro={busqueda}
        setFiltro={setBusqueda}
      />
      <TablaReservas
        dataListadoReservas={reservasFiltradas}
        cargando={cargando}
        setAbrirModalEditar={setAbrirModalEditar}
        setReservaEditar={setReservaEditar}
        setSelected={setSelected}
        selected={selected}
        setSelectedData={setSelectedData}
        selectedData={selectedData}
      />
      <ModalRegistroReservas
        setAbrirModalReservas={setAbrirModalReservas}
        abrirModalReservas={abrirModalReservas}
        actualizarData={() => getListarReservas()}
      />
      <ModalEditarReserva
        abrirModalEditar={abrirModalEditar}
        setAbrirModalEditar={setAbrirModalEditar}
        reservaEditar={reservaEditar}
        actualizarData={() => getListarReservas()}
        setSelected={setSelected}
        setSelectedData={setSelectedData}
      />
    </>
  );
};
export default GestionReservas;
