import TablaReservas from "../moleculas/TablaReservas.moleculas";
import EncabezadoReservas from "../moleculas/EncabezadoReservas.moleculas";
import { useEffect, useState } from "react";
import { gestionarListadoReservas } from "../../api/consultarReservas.ts";
import ModalRegistroReservas from "../moleculas/ModalRegistroReservas.moleculas";
import {
  IDataReservas,
  IEliminarReserva,
} from "../../interface/reservas.interface";
import ModalEditarReserva from "../moleculas/ModalEditarReservas.moleculas";
import dayjs, { Dayjs } from "dayjs";
import { Box } from "@mui/material";
import ModalDetalleReservas from "../moleculas/ModalDetalleReservas.moleculas";
import ModalAdvertencia from "../moleculas/ModalAdvertencia.moleculas";
import { eliminarReserva } from "../../api/consultarReservas.ts";
import { useSnackbar } from "notistack";
import ModalDetalleUsuario from "../moleculas/ModalDetalleUsuario.moleculas";
import { IDataModalDetalleUsuarios } from "../../interface/reservas.interface";
import ModalErrorAdvertencia from "../moleculas/ModalErrorAdvertencia.moleculas";
const GestionReservas = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [listarReservas, setListarReservas] = useState<IDataReservas[]>([]);
  const [dataFiltrada, setDataFiltrada] = useState<IDataReservas[]>([]);
  const [abrirModalReservas, setAbrirModalReservas] = useState<boolean>(false);
  const [cargando, setCargando] = useState<boolean>(false);
  const [abrirModalEditar, setAbrirModalEditar] = useState<boolean>(false);
  const [reservaEditar, setReservaEditar] = useState<IDataReservas | null>(
    null
  );
  const [filtro, setFiltro] = useState("");
  const [filtroFecha, setFiltroFecha] = useState<Dayjs | null>(dayjs());
  const [reservasHoy, setReservasHoy] = useState<number>(0);
  const [reservasFuturas, setReservasFuturas] = useState<number>(0);
  const [detalleReserva, setDetalleReserva] = useState<string>("");
  const [nombreCliente, setNombreCliente] = useState<string>("");
  const [abrirModalDetalleReservas, setAbrirModalDetalleReservas] =
    useState<boolean>(false);
  const [abrirModalEliminarReservas, setAbrirModalEliminarReservas] =
    useState<boolean>(false);
  const [eliminarReservas, setEliminarReservas] = useState<IEliminarReserva>({
    id: 0,
    nombreCliente: "",
  });
  const [loadingBtnEliminar, setLoadingBtnEliminar] = useState<boolean>(false);
  const [usuarioDetalle, setUsuarioDetalle] =
    useState<IDataModalDetalleUsuarios | null>(null);
  const [abrirModalDetalleUsuarios, setAbrirModalDetalleUsuarios] =
    useState(false);
  const [abrirModalModalErrorAdvertencia, setAbrirModalModalErrorAdvertencia] =
    useState<boolean>(false);
  const [textErrorResponse, setTextErrorResponse] = useState<string>("");

  useEffect(() => {
    getListarReservas();
  }, [filtroFecha, filtro]);

  const getListarReservas = async () => {
    const fecha = filtroFecha ? dayjs(filtroFecha).format("YYYY-MM-DD") : "";
    try {
      setCargando(true);
      //const userId = localStorage.getItem("userId");
      const dataListado = await gestionarListadoReservas({
        fecha,
        nombreCliente: filtro,
      });
      setListarReservas(dataListado.reservas);
    } catch (error) {
      console.log("error", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    setDataFiltrada(listarReservas);
    calcularCantidadReservas();
  }, [listarReservas, filtroFecha, filtro]);

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

  const deleteReserva = async (id: number) => {
    try {
      setLoadingBtnEliminar(true);
      await eliminarReserva(id);
      setAbrirModalEliminarReservas(false);
      enqueueSnackbar("Reserva eliminada con éxito", { variant: "success" });
      getListarReservas();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingBtnEliminar(false);
    }
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
          setDetalleReserva={setDetalleReserva}
          setAbrirModalDetalleReservas={setAbrirModalDetalleReservas}
          setNombreCliente={setNombreCliente}
          setAbrirModalEliminarReservas={setAbrirModalEliminarReservas}
          setEliminarReservas={setEliminarReservas}
          setAbrirModalDetalleUsuarios={setAbrirModalDetalleUsuarios}
          setUsuarioDetalle={setUsuarioDetalle}
        />
      </Box>
      <ModalRegistroReservas
        setAbrirModalReservas={setAbrirModalReservas}
        abrirModalReservas={abrirModalReservas}
        actualizarData={() => getListarReservas()}
        setAbrirModalModalErrorAdvertencia={setAbrirModalModalErrorAdvertencia}
        setTextErrorResponse={setTextErrorResponse}
      />
      <ModalEditarReserva
        abrirModalEditar={abrirModalEditar}
        setAbrirModalEditar={setAbrirModalEditar}
        reservaEditar={reservaEditar}
        actualizarData={() => getListarReservas()}
      />
      <ModalDetalleReservas
        abrirModalDetalleReservas={abrirModalDetalleReservas}
        setAbrirModalDetalleReservas={setAbrirModalDetalleReservas}
        detalle={detalleReserva}
        nombreCliente={nombreCliente}
      />
      <ModalAdvertencia
        abrirModalEliminarReservas={abrirModalEliminarReservas}
        setAbrirModalEliminarReservas={setAbrirModalEliminarReservas}
        nombreCliente={eliminarReservas.nombreCliente}
        onEliminar={() => deleteReserva(eliminarReservas.id)}
        loadingBtnEliminar={loadingBtnEliminar}
      />
      <ModalDetalleUsuario
        abrirModalDetalleUsuarios={abrirModalDetalleUsuarios}
        setAbrirModalDetalleUsuarios={setAbrirModalDetalleUsuarios}
        dataModalDetalleUsuarios={usuarioDetalle}
      />
      <ModalErrorAdvertencia
        abrirModalModalErrorAdvertencia={abrirModalModalErrorAdvertencia}
        setAbrirModalModalErrorAdvertencia={setAbrirModalModalErrorAdvertencia}
        titulo={"Advertencia"}
        textBody={textErrorResponse}
      />
    </>
  );
};
export default GestionReservas;
