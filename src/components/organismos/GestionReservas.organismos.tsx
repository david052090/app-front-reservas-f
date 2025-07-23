import TablaReservas from "../moleculas/TablaReservas.moleculas";
import EncabezadoReservas from "../moleculas/EncabezadoReservas.moleculas";
import { useEffect, useState } from "react";
import { gestionarListadoReservas } from "../../api/consultarReservas.ts";
import ModalRegistroReservas from "../moleculas/ModalRegistroReservas.moleculas";
import { IDataReservas } from "../../interface/reservas.interface";
import ModalEditarReserva from "../moleculas/ModalEditarReservas.moleculas";
import dayjs, { Dayjs } from "dayjs";
import { getListaAmbientes } from "../../utils/obtenerAmbientes";

const GestionReservas = () => {
  const [listarReservas, setListarReservas] = useState<IDataReservas[]>([]);
  const [dataFiltrada, setDataFiltrada] = useState<IDataReservas[]>([]);
  const [abrirModalReservas, setAbrirModalReservas] = useState<boolean>(false);
  const [cargando, setCargando] = useState<boolean>(false);
  const [abrirModalEditar, setAbrirModalEditar] = useState<boolean>(false);
  const [reservaEditar, setReservaEditar] = useState<IDataReservas | null>(
    null
  );
  const [selected, setSelected] = useState<number[]>([]);
  const [selectedData, setSelectedData] = useState<IDataReservas[]>([]);
  const [filtro, setFiltro] = useState("");
  const [filtroFecha, setFiltroFecha] = useState<Dayjs | null>(null);

  useEffect(() => {
    getListarReservas();
  }, []);
  const getListarReservas = async () => {
    try {
      setCargando(true);
      //const userId = localStorage.getItem("userId");
      const dataListado = await gestionarListadoReservas();
      setListarReservas(dataListado.reservas);
    } catch (error) {
      console.log("error", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const filtrado = listarReservas.filter((reserva) => {
      const coincideNombre = reserva.nombre_cliente
        .toLowerCase()
        .includes(filtro.toLowerCase());

      const coincideFecha = filtroFecha
        ? dayjs(reserva.fecha).isSame(filtroFecha, "day")
        : true;

      return coincideNombre && coincideFecha;
    });

    setDataFiltrada(filtrado);
  }, [filtro, filtroFecha, listarReservas]);

  return (
    <>
      <EncabezadoReservas
        setAbrirModalReservas={setAbrirModalReservas}
        actualizarTabla={() => getListarReservas()}
        filtro={filtro}
        setFiltro={setFiltro}
        filtroFecha={filtroFecha}
        setFiltroFecha={setFiltroFecha}
        mostrarBuscador
        mostrarFecha
      />
      <TablaReservas
        dataListadoReservas={dataFiltrada}
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
