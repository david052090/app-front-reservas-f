import TablaReservas from "../moleculas/TablaReservas.moleculas";
import EncabezadoReservas from "../moleculas/EncabezadoReservas.moleculas";
import { useEffect, useState } from "react";
import { gestionarListadoReservas } from "../../api/consultarReservas.ts";
import ModalRegistroReservas from "../moleculas/ModalRegistroReservas.moleculas";
import { IDataReservas } from "../../interface/reservas.interface";
import ModalEditarReserva from "../moleculas/ModalEditarReservas.moleculas";
import dayjs, { Dayjs } from "dayjs";
import { Box } from "@mui/material";

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
  const [reservasHoy, setReservasHoy] = useState<number>(0);
  const [reservasFuturas, setReservasFuturas] = useState<number>(0);
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
    calcularCantidadReservas();
  }, [filtro, filtroFecha, listarReservas]);

  const calcularCantidadReservas = () => {
    const hoy = dayjs();
    const confirmadas = listarReservas.filter((r) => r.estado_reserva === 1);

    const hoyConfirmadas = confirmadas.filter((r) =>
      dayjs(r.fecha).isSame(hoy, "day")
    );
    const futurasConfirmadas = confirmadas.filter((r) =>
      dayjs(r.fecha).isAfter(hoy, "day")
    );

    setReservasHoy(hoyConfirmadas.length);
    setReservasFuturas(futurasConfirmadas.length);
  };
  return (
    <>
      <Box
        sx={{
          width: { xs: "auto", md: "1040px" },
          maxWidth: { xs: "100vw", md: "none" },
          mx: 0,
          px: 0,
        }}
      >
        <EncabezadoReservas
          setAbrirModalReservas={setAbrirModalReservas}
          actualizarTabla={() => getListarReservas()}
          filtro={filtro}
          setFiltro={setFiltro}
          filtroFecha={filtroFecha}
          setFiltroFecha={setFiltroFecha}
          mostrarBuscador
          mostrarFecha
          reservasHoy={reservasHoy}
          reservasFuturas={reservasFuturas}
          mostrarContadores
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
      </Box>
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
