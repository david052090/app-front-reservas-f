import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";
import {
  actualizarEstadoMesa,
  agregarPlatoMesa,
  asignarReservaMesa,
  crearMesas,
  eliminarPlatoMesa,
  listarMesas,
} from "../../api/consultarMesas";
import { gestionarListadoReservas } from "../../api/consultarReservas";
import { IDataReservas } from "../../interface/reservas.interface";
import { EstadoMesa, IMesa } from "../../interface/mesas.interface";
import { getListaAmbientes } from "../../utils/obtenerAmbientes";
import Modal from "../moleculas/Modal.moleculas";

interface IPlatoBorrador {
  nombre: string;
  cantidad: number;
  precio_unitario: number;
}

const GestionMesas = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [mesas, setMesas] = useState<IMesa[]>([]);
  const [reservas, setReservas] = useState<IDataReservas[]>([]);
  const [ambientes, setAmbientes] = useState<string[]>([]);
  const [cargando, setCargando] = useState(false);

  const [abrirModal, setAbrirModal] = useState(false);
  const [mesaSeleccionada, setMesaSeleccionada] = useState<IMesa | null>(null);
  const [reservaId, setReservaId] = useState<string>("");
  const [estadoMesa, setEstadoMesa] = useState<EstadoMesa>("habilitada");

  const [nombrePlato, setNombrePlato] = useState("");
  const [cantidadPlato, setCantidadPlato] = useState<number>(1);
  const [precioPlato, setPrecioPlato] = useState<number>(0);

  const [loadingGuardar, setLoadingGuardar] = useState(false);
  const [loadingPlato, setLoadingPlato] = useState(false);
  const [abrirModalCrear, setAbrirModalCrear] = useState(false);
  const [loadingCrearMesa, setLoadingCrearMesa] = useState(false);

  const [numeroMesaNueva, setNumeroMesaNueva] = useState<number>(1);
  const [ubicacionMesaNueva, setUbicacionMesaNueva] = useState<string>("");
  const [estadoMesaNueva, setEstadoMesaNueva] =
    useState<EstadoMesa>("habilitada");
  const [reservaIdMesaNueva, setReservaIdMesaNueva] = useState<string>("");
  const [platosMesaNueva, setPlatosMesaNueva] = useState<IPlatoBorrador[]>([]);

  const cargarMesas = async () => {
    try {
      setCargando(true);
      const data = await listarMesas();
      setMesas(data);
      return data;
    } catch (error) {
      console.error(error);
      enqueueSnackbar("No se pudo obtener la información de mesas", {
        variant: "error",
      });
      return [];
    } finally {
      setCargando(false);
    }
  };

  const cargarReservas = async () => {
    try {
      const fechaActual = dayjs().format("YYYY-MM-DD");
      const data = await gestionarListadoReservas({ fecha: fechaActual });
      setReservas(data?.reservas ?? []);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("No se pudo obtener la lista de reservas", {
        variant: "warning",
      });
    }
  };

  useEffect(() => {
    cargarMesas();
    cargarReservas();
    cargarAmbientes();
  }, []);

  const cargarAmbientes = async () => {
    try {
      const respuesta = await getListaAmbientes();
      setAmbientes(
        respuesta.map(
          (item: { nombre_ambiente: string }) => item.nombre_ambiente,
        ),
      );
    } catch (error) {
      console.error(error);
      enqueueSnackbar("No se pudo obtener el listado de ambientes", {
        variant: "warning",
      });
    }
  };

  const totalPlatosMesa = useMemo(() => {
    if (!mesaSeleccionada) return 0;
    return mesaSeleccionada.platos.reduce(
      (acc, plato) => acc + plato.cantidad,
      0,
    );
  }, [mesaSeleccionada]);

  const abrirGestionMesa = (mesa: IMesa) => {
    setMesaSeleccionada(mesa);
    setReservaId(mesa.reserva?.id ? String(mesa.reserva.id) : "");
    setEstadoMesa(mesa.estado);
    setAbrirModal(true);
  };

  const cerrarModal = () => {
    setAbrirModal(false);
    setMesaSeleccionada(null);
    setReservaId("");
    setEstadoMesa("habilitada");
    setNombrePlato("");
    setCantidadPlato(1);
    setPrecioPlato(0);
  };

  const guardarAsignacion = async () => {
    if (!mesaSeleccionada) return;
    try {
      setLoadingGuardar(true);
      await Promise.all([
        asignarReservaMesa(
          mesaSeleccionada.id,
          reservaId ? Number(reservaId) : null,
        ),
        actualizarEstadoMesa(mesaSeleccionada.id, estadoMesa),
      ]);
      enqueueSnackbar("Mesa actualizada correctamente", { variant: "success" });
      const dataMesas = await cargarMesas();
      const mesaActualizada = dataMesas.find(
        (mesa) => mesa.id === mesaSeleccionada.id,
      );
      if (mesaActualizada) {
        setMesaSeleccionada(mesaActualizada);
      }
      cerrarModal();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("No fue posible guardar la asignación", {
        variant: "error",
      });
    } finally {
      setLoadingGuardar(false);
    }
  };

  const guardarPlato = async () => {
    if (!mesaSeleccionada) return;
    if (!nombrePlato.trim()) {
      enqueueSnackbar("Debes ingresar el nombre del plato", {
        variant: "warning",
      });
      return;
    }
    if (cantidadPlato <= 0 || precioPlato < 0) {
      enqueueSnackbar("Cantidad y precio deben ser válidos", {
        variant: "warning",
      });
      return;
    }

    try {
      setLoadingPlato(true);
      await agregarPlatoMesa(mesaSeleccionada.id, {
        nombre: nombrePlato.trim(),
        cantidad: Number(cantidadPlato),
        precio_unitario: Number(precioPlato),
      });
      enqueueSnackbar("Plato agregado correctamente", { variant: "success" });
      setNombrePlato("");
      setCantidadPlato(1);
      setPrecioPlato(0);
      const dataMesas = await cargarMesas();
      const mesaActualizada = dataMesas.find(
        (mesa) => mesa.id === mesaSeleccionada.id,
      );
      if (mesaActualizada) {
        setMesaSeleccionada(mesaActualizada);
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("No se pudo agregar el plato", { variant: "error" });
    } finally {
      setLoadingPlato(false);
    }
  };

  const borrarPlato = async (idPlatoMesa: number) => {
    if (!mesaSeleccionada) return;
    try {
      await eliminarPlatoMesa(mesaSeleccionada.id, idPlatoMesa);
      enqueueSnackbar("Plato eliminado", { variant: "success" });
      const dataMesas = await cargarMesas();
      const mesaActualizada = dataMesas.find(
        (mesa) => mesa.id === mesaSeleccionada.id,
      );
      if (mesaActualizada) {
        setMesaSeleccionada(mesaActualizada);
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("No se pudo eliminar el plato", { variant: "error" });
    }
  };

  const mesasOrdenadas = useMemo(() => {
    return [...mesas].sort((a, b) => a.numero - b.numero);
  }, [mesas]);

  const abrirCrearMesa = () => {
    setNumeroMesaNueva(1);
    setUbicacionMesaNueva("");
    setEstadoMesaNueva("habilitada");
    setReservaIdMesaNueva("");
    setPlatosMesaNueva([]);
    setAbrirModalCrear(true);
  };

  const cerrarModalCrear = () => {
    setAbrirModalCrear(false);
  };

  const agregarFilaPlatoNuevaMesa = () => {
    setPlatosMesaNueva((prev) => [
      ...prev,
      { nombre: "", cantidad: 1, precio_unitario: 0 },
    ]);
  };

  const eliminarFilaPlatoNuevaMesa = (index: number) => {
    setPlatosMesaNueva((prev) => prev.filter((_, i) => i !== index));
  };

  const actualizarFilaPlatoNuevaMesa = (
    index: number,
    campo: keyof IPlatoBorrador,
    valor: string | number,
  ) => {
    setPlatosMesaNueva((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        return {
          ...item,
          [campo]: campo === "nombre" ? String(valor) : Number(valor),
        };
      }),
    );
  };

  const crearMesa = async () => {
    const numero = Number(numeroMesaNueva);
    if (!Number.isFinite(numero) || numero <= 0) {
      enqueueSnackbar("El número de mesa debe ser mayor a 0", {
        variant: "warning",
      });
      return;
    }
    if (!ubicacionMesaNueva.trim()) {
      enqueueSnackbar("La ubicación es obligatoria", { variant: "warning" });
      return;
    }

    const platosValidados = platosMesaNueva
      .filter((plato) => plato.nombre.trim())
      .map((plato) => ({
        nombre: plato.nombre.trim(),
        cantidad: Number(plato.cantidad),
        precio_unitario: Number(plato.precio_unitario),
      }));

    const hayPlatoInvalido = platosValidados.some(
      (plato) => plato.cantidad <= 0 || plato.precio_unitario < 0,
    );
    if (hayPlatoInvalido) {
      enqueueSnackbar("Revisa cantidad y precio de los platos", {
        variant: "warning",
      });
      return;
    }

    try {
      setLoadingCrearMesa(true);
      await crearMesas([
        {
          numero,
          ubicacion: ubicacionMesaNueva.trim(),
          estado: estadoMesaNueva,
          reserva_id: reservaIdMesaNueva ? Number(reservaIdMesaNueva) : null,
          platos: platosValidados,
        },
      ]);
      enqueueSnackbar("Mesa creada correctamente", { variant: "success" });
      setAbrirModalCrear(false);
      await cargarMesas();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("No se pudo crear la mesa", { variant: "error" });
    } finally {
      setLoadingCrearMesa(false);
    }
  };

  return (
    <>
      <Box sx={{ width: { xs: "auto", md: "1040px" }, maxWidth: "100%" }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
            Gestión de mesas
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={abrirCrearMesa}>
              Crear mesa
            </Button>
            <Button
              variant="outlined"
              onClick={cargarMesas}
              disabled={cargando}
            >
              Actualizar
            </Button>
          </Stack>
        </Stack>

        <Grid container spacing={2}>
          {mesasOrdenadas.map((mesa) => (
            <Grid key={mesa.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <Card>
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="h6">
                      Mesa #{mesa.numero} - {mesa.ubicacion}
                    </Typography>
                    <Chip
                      size="small"
                      label={
                        mesa.estado === "ocupada" ? "Ocupada" : "Habilitada"
                      }
                      color={mesa.estado === "ocupada" ? "error" : "success"}
                    />
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Reserva: {mesa.reserva?.nombre_cliente ?? "Sin reserva"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Platos: {mesa.platos?.length ?? 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total: ${Number(mesa.total ?? 0).toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => abrirGestionMesa(mesa)}
                  >
                    Gestionar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Modal
        open={abrirModalCrear}
        onCancelar={cerrarModalCrear}
        titulo="Crear mesa"
        onGuardar={crearMesa}
        loadingBtnGuardar={loadingCrearMesa}
        mostrarBtnGuardar
        mostrarBtnCancelar
        btnGuardar="Crear"
        width={700}
      >
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <TextField
              label="Número de mesa"
              type="number"
              size="small"
              value={numeroMesaNueva}
              onChange={(event) =>
                setNumeroMesaNueva(Number(event.target.value))
              }
              fullWidth
            />
            <TextField
              select
              label="Ubicación"
              size="small"
              value={ubicacionMesaNueva}
              onChange={(event) => setUbicacionMesaNueva(event.target.value)}
              fullWidth
            >
              <MenuItem value="">Selecciona una ubicación</MenuItem>
              {ambientes.map((ambiente) => (
                <MenuItem key={ambiente} value={ambiente}>
                  {ambiente}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <TextField
              select
              label="Estado"
              size="small"
              value={estadoMesaNueva}
              onChange={(event) =>
                setEstadoMesaNueva(event.target.value as EstadoMesa)
              }
              fullWidth
            >
              <MenuItem value="habilitada">Habilitada</MenuItem>
              <MenuItem value="ocupada">Ocupada</MenuItem>
            </TextField>
            <TextField
              select
              label="Reserva asociada (opcional)"
              size="small"
              value={reservaIdMesaNueva}
              onChange={(event) => setReservaIdMesaNueva(event.target.value)}
              fullWidth
            >
              <MenuItem value="">Sin reserva</MenuItem>
              {reservas.map((reserva) => (
                <MenuItem key={reserva.id} value={String(reserva.id)}>
                  {reserva.nombre_cliente} - Mesa {reserva.numero_mesa}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Divider />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography sx={{ fontWeight: 600 }}>
              Platos iniciales (opcional)
            </Typography>
            <Button size="small" onClick={agregarFilaPlatoNuevaMesa}>
              Agregar plato
            </Button>
          </Stack>

          <Stack spacing={1}>
            {platosMesaNueva.map((plato, index) => (
              <Stack
                key={index}
                direction={{ xs: "column", md: "row" }}
                spacing={1}
              >
                <TextField
                  label="Nombre"
                  size="small"
                  value={plato.nombre}
                  onChange={(event) =>
                    actualizarFilaPlatoNuevaMesa(
                      index,
                      "nombre",
                      event.target.value,
                    )
                  }
                  fullWidth
                />
                <TextField
                  label="Cantidad"
                  size="small"
                  type="number"
                  value={plato.cantidad}
                  onChange={(event) =>
                    actualizarFilaPlatoNuevaMesa(
                      index,
                      "cantidad",
                      Number(event.target.value),
                    )
                  }
                  sx={{ width: { xs: "100%", md: 130 } }}
                />
                <TextField
                  label="Precio unitario"
                  size="small"
                  type="number"
                  value={plato.precio_unitario}
                  onChange={(event) =>
                    actualizarFilaPlatoNuevaMesa(
                      index,
                      "precio_unitario",
                      Number(event.target.value),
                    )
                  }
                  sx={{ width: { xs: "100%", md: 150 } }}
                />
                <Button
                  color="error"
                  onClick={() => eliminarFilaPlatoNuevaMesa(index)}
                  sx={{ minWidth: 100 }}
                >
                  Quitar
                </Button>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Modal>

      <Modal
        open={abrirModal}
        onCancelar={cerrarModal}
        titulo={`Mesa #${mesaSeleccionada?.numero ?? ""}`}
        onGuardar={guardarAsignacion}
        loadingBtnGuardar={loadingGuardar}
        mostrarBtnGuardar
        mostrarBtnCancelar
        btnGuardar="Guardar"
        width={680}
      >
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField
            select
            label="Reserva asociada (opcional)"
            value={reservaId}
            onChange={(event) => setReservaId(event.target.value)}
            size="small"
            fullWidth
          >
            <MenuItem value="">Sin reserva</MenuItem>
            {reservas.map((reserva) => (
              <MenuItem key={reserva.id} value={String(reserva.id)}>
                {reserva.nombre_cliente} - Mesa {reserva.numero_mesa}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Estado de la mesa"
            value={estadoMesa}
            onChange={(event) =>
              setEstadoMesa(event.target.value as EstadoMesa)
            }
            size="small"
            fullWidth
          >
            <MenuItem value="habilitada">Habilitada</MenuItem>
            <MenuItem value="ocupada">Ocupada</MenuItem>
          </TextField>

          <Divider />

          <Typography sx={{ fontWeight: 600 }}>
            Registrar plato para la mesa (con o sin reserva)
          </Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
            <TextField
              label="Plato"
              size="small"
              fullWidth
              value={nombrePlato}
              onChange={(event) => setNombrePlato(event.target.value)}
            />
            <TextField
              label="Cantidad"
              size="small"
              type="number"
              value={cantidadPlato}
              onChange={(event) => setCantidadPlato(Number(event.target.value))}
              sx={{ width: { xs: "100%", md: 120 } }}
            />
            <TextField
              label="Precio"
              size="small"
              type="number"
              value={precioPlato}
              onChange={(event) => setPrecioPlato(Number(event.target.value))}
              sx={{ width: { xs: "100%", md: 140 } }}
            />
            <Button
              variant="contained"
              onClick={guardarPlato}
              disabled={loadingPlato}
              sx={{ minWidth: 130 }}
            >
              Agregar
            </Button>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            Cantidad total de platos: {totalPlatosMesa}
          </Typography>

          <Stack spacing={1}>
            {mesaSeleccionada?.platos?.length ? (
              mesaSeleccionada.platos.map((plato) => (
                <Stack
                  key={plato.id}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                  }}
                >
                  <Typography variant="body2">
                    {plato.nombre} x{plato.cantidad} - $
                    {plato.subtotal.toFixed(2)}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => borrarPlato(plato.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No hay platos registrados para esta mesa.
              </Typography>
            )}
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default GestionMesas;
