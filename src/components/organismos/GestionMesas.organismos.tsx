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
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import {
  crearMesas,
  facturarMesa,
  listarMesas,
  patchMesaBatch,
} from "../../api/consultarMesas";
import {
  actualizarInventarioPlato,
  listarInventarioPlatos,
} from "../../api/inventarioPlatos";
import { gestionarListadoReservas } from "../../api/consultarReservas";
import { IInventarioPlato } from "../../interface/inventario.interface";
import { IDataReservas } from "../../interface/reservas.interface";
import {
  EstadoMesa,
  IMesa,
  IPlatoEnEdicion,
  IFormGestionMesa,
} from "../../interface/mesas.interface";
import { getListaAmbientes } from "../../utils/obtenerAmbientes";
import Modal from "../moleculas/Modal.moleculas";

const GestionMesas = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [mesas, setMesas] = useState<IMesa[]>([]);
  const [reservas, setReservas] = useState<IDataReservas[]>([]);
  const [ambientes, setAmbientes] = useState<string[]>([]);
  const [cargando, setCargando] = useState(false);

  const [abrirModal, setAbrirModal] = useState(false);
  const [mesaSeleccionada, setMesaSeleccionada] = useState<IMesa | null>(null);
  const [platosEnEdicion, setPlatosEnEdicion] = useState<IPlatoEnEdicion[]>([]);
  const [inventarioPlatos, setInventarioPlatos] = useState<IInventarioPlato[]>(
    [],
  );

  const [loadingGuardar, setLoadingGuardar] = useState(false);
  const [facturandoMesaId, setFacturandoMesaId] = useState<number | null>(null);
  const [abrirModalCrear, setAbrirModalCrear] = useState(false);
  const [loadingCrearMesa, setLoadingCrearMesa] = useState(false);

  const [numeroMesaNueva, setNumeroMesaNueva] = useState<number>(1);
  const [errorNumeroMesaNueva, setErrorNumeroMesaNueva] = useState("");
  const [ubicacionMesaNueva, setUbicacionMesaNueva] = useState<string>("");
  const [errorUbicacionMesaNueva, setErrorUbicacionMesaNueva] = useState("");
  const [estadoMesaNueva, setEstadoMesaNueva] =
    useState<EstadoMesa>("habilitada");
  const [reservaIdMesaNueva, setReservaIdMesaNueva] = useState<string>("");
  const valoresInicialesGestionMesa: IFormGestionMesa = {
    reservaId: "",
    estadoMesa: "habilitada",
    platoId: "",
    cantidadPlato: 1,
  };
  const { control, reset, setValue, getValues, watch } =
    useForm<IFormGestionMesa>({
      defaultValues: valoresInicialesGestionMesa,
    });
  const [platoIdForm, cantidadPlatoForm] = watch(["platoId", "cantidadPlato"]);
  const puedeAgregarPlato =
    Boolean(platoIdForm) && Number(cantidadPlatoForm) > 0;

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
    cargarInventarioPlatos();
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

  const cargarInventarioPlatos = async () => {
    try {
      const data = await listarInventarioPlatos();
      setInventarioPlatos(data);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("No se pudo obtener el listado de platos", {
        variant: "warning",
      });
    }
  };

  const totalPlatosMesa = useMemo(() => {
    return platosEnEdicion.reduce((acc, plato) => acc + plato.cantidad, 0);
  }, [platosEnEdicion]);

  const abrirGestionMesa = (mesa: IMesa) => {
    setMesaSeleccionada(mesa);
    reset({
      ...valoresInicialesGestionMesa,
      reservaId: mesa.reserva?.id ? String(mesa.reserva.id) : "",
      estadoMesa: mesa.estado,
    });
    setPlatosEnEdicion(
      mesa.platos.map((plato) => ({
        ...plato,
        tempId: `plato-${plato.id}`,
      })),
    );
    setAbrirModal(true);
  };

  const cerrarModal = () => {
    setAbrirModal(false);
    setMesaSeleccionada(null);
    reset(valoresInicialesGestionMesa);
    setPlatosEnEdicion([]);
  };

  const guardarAsignacion = async () => {
    if (!mesaSeleccionada) return;
    const { reservaId, estadoMesa } = getValues();
    try {
      setLoadingGuardar(true);
      const idsActuales = new Set(
        platosEnEdicion
          .filter((plato) => plato.id !== undefined)
          .map((plato) => plato.id as number),
      );
      const idsOriginales = mesaSeleccionada.platos.map((plato) => plato.id);
      const platosAEliminar = idsOriginales.filter(
        (id) => !idsActuales.has(id),
      );
      const platosANuevo = platosEnEdicion
        .filter((plato) => plato.id === undefined)
        .map((plato) => ({
          inventarioId: plato.inventarioId,
          nombre: plato.nombre,
          cantidad: plato.cantidad,
          precio_unitario: plato.precio_unitario,
        }));

      const descuentosInventario = new Map<number, number>();
      for (const plato of platosANuevo) {
        if (!plato.inventarioId) continue;
        const cantidadActual =
          descuentosInventario.get(plato.inventarioId) ?? 0;
        descuentosInventario.set(
          plato.inventarioId,
          cantidadActual + plato.cantidad,
        );
      }

      for (const [inventarioId, cantidadDescontar] of descuentosInventario) {
        const platoInventario = inventarioPlatos.find(
          (item) => item.id === inventarioId,
        );
        if (!platoInventario) {
          enqueueSnackbar("No se encontró un plato en inventario", {
            variant: "warning",
          });
          return;
        }
        if (Number(platoInventario.cantidad_disponible) < cantidadDescontar) {
          enqueueSnackbar(
            `Inventario insuficiente para ${platoInventario.nombre}`,
            {
              variant: "warning",
            },
          );
          return;
        }
      }

      await patchMesaBatch(mesaSeleccionada.id, {
        reserva_id: reservaId ? Number(reservaId) : null,
        estado: estadoMesa,
        platos_agregar: platosANuevo.map((plato) => ({
          nombre: plato.nombre,
          cantidad: plato.cantidad,
          precio_unitario: plato.precio_unitario,
        })),
        platos_eliminar: platosAEliminar,
      });

      for (const [inventarioId, cantidadDescontar] of descuentosInventario) {
        const platoInventario = inventarioPlatos.find(
          (item) => item.id === inventarioId,
        );
        if (!platoInventario) continue;
        await actualizarInventarioPlato(inventarioId, {
          cantidad_disponible:
            Number(platoInventario.cantidad_disponible) - cantidadDescontar,
        });
      }
      await cargarInventarioPlatos();
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

  const guardarPlato = () => {
    const { platoId, cantidadPlato } = getValues();
    if (!platoId) {
      enqueueSnackbar("Debes seleccionar un plato", {
        variant: "warning",
      });
      return;
    }
    if (cantidadPlato <= 0) {
      enqueueSnackbar("La cantidad debe ser válida", {
        variant: "warning",
      });
      return;
    }
    const platoSeleccionado = inventarioPlatos.find(
      (plato) => String(plato.id) === platoId,
    );
    if (!platoSeleccionado) {
      enqueueSnackbar("El plato seleccionado no existe en inventario", {
        variant: "warning",
      });
      return;
    }
    const precioUnitario = Number(platoSeleccionado.valor_unitario ?? 0);

    setPlatosEnEdicion((prev) => [
      ...prev,
      {
        tempId: `nuevo-${Date.now()}-${prev.length}`,
        inventarioId: platoSeleccionado.id,
        nombre: platoSeleccionado.nombre.trim(),
        cantidad: Number(cantidadPlato),
        precio_unitario: precioUnitario,
        subtotal: Number(cantidadPlato) * precioUnitario,
      },
    ]);
    setValue("platoId", "");
    setValue("cantidadPlato", 1);
  };

  const borrarPlato = (tempId: string) => {
    setPlatosEnEdicion((prev) =>
      prev.filter((plato) => plato.tempId !== tempId),
    );
  };

  const mesasOrdenadas = useMemo(() => {
    return [...mesas].sort((a, b) => a.numero - b.numero);
  }, [mesas]);

  const abrirCrearMesa = () => {
    setNumeroMesaNueva(1);
    setErrorNumeroMesaNueva("");
    setUbicacionMesaNueva("");
    setErrorUbicacionMesaNueva("");
    setEstadoMesaNueva("habilitada");
    setReservaIdMesaNueva("");
    setAbrirModalCrear(true);
  };

  const cerrarModalCrear = () => {
    setErrorNumeroMesaNueva("");
    setErrorUbicacionMesaNueva("");
    setAbrirModalCrear(false);
  };

  const validarNumeroMesaNueva = (numero: number) => {
    if (!Number.isFinite(numero) || numero <= 0) {
      setErrorNumeroMesaNueva(
        "El número de mesa es obligatorio y debe ser mayor a 0",
      );
      return false;
    }
    setErrorNumeroMesaNueva("");
    return true;
  };

  const validarUbicacionMesaNueva = (ubicacion: string) => {
    if (!ubicacion.trim()) {
      setErrorUbicacionMesaNueva("La ubicación es obligatoria");
      return false;
    }
    setErrorUbicacionMesaNueva("");
    return true;
  };

  const crearMesa = async () => {
    const numero = Number(numeroMesaNueva);
    const esNumeroValido = validarNumeroMesaNueva(numero);
    const esUbicacionValida = validarUbicacionMesaNueva(ubicacionMesaNueva);
    if (!esNumeroValido || !esUbicacionValida) {
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
          platos: [],
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

  const facturarMesaTarjeta = async (mesa: IMesa) => {
    try {
      setFacturandoMesaId(mesa.id);
      const respuesta = await facturarMesa(mesa.id);
      enqueueSnackbar(
        `Mesa facturada. Total: $${Number(
          respuesta.total_facturado_mesa ?? 0,
        ).toLocaleString("es-CO", { maximumFractionDigits: 0 })}`,
        {
          variant: "success",
        },
      );
      await cargarMesas();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("No se pudo facturar la mesa", {
        variant: "error",
      });
    } finally {
      setFacturandoMesaId(null);
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
          {cargando
            ? Array.from({ length: 6 }).map((_, index) => (
                <Grid
                  key={`skeleton-mesa-${index}`}
                  size={{ xs: 12, md: 6, lg: 4 }}
                >
                  <Card>
                    <CardContent>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ mb: 1 }}
                      >
                        <Skeleton variant="text" width="70%" height={32} />
                        <Skeleton variant="rounded" width={85} height={24} />
                      </Stack>
                      <Skeleton variant="text" width="80%" />
                      <Skeleton variant="text" width="35%" />
                      <Skeleton variant="text" width="45%" />
                      <Skeleton
                        variant="rounded"
                        width={110}
                        height={36}
                        sx={{ mt: 2 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : mesasOrdenadas.map((mesa) => (
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
                          color={
                            mesa.estado === "ocupada" ? "error" : "success"
                          }
                        />
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        Reserva: {mesa.reserva?.nombre_cliente ?? "Sin reserva"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Platos: {mesa.platos?.length ?? 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total: $
                        {Number(mesa.total ?? 0).toLocaleString("es-CO", {
                          maximumFractionDigits: 0,
                        })}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mt: 2, width: "100%" }}
                      >
                        <Button
                          variant="contained"
                          onClick={() => abrirGestionMesa(mesa)}
                        >
                          Gestionar
                        </Button>
                        <Button
                          variant="outlined"
                          color="success"
                          disabled={
                            facturandoMesaId === mesa.id ||
                            Number(mesa.total ?? 0) <= 0
                          }
                          onClick={() => facturarMesaTarjeta(mesa)}
                        >
                          {facturandoMesaId === mesa.id
                            ? "Cerrando..."
                            : "Cerrar mesa"}
                        </Button>
                      </Stack>
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
              onChange={(event) => {
                const nuevoNumero = Number(event.target.value);
                setNumeroMesaNueva(nuevoNumero);
                if (errorNumeroMesaNueva) {
                  validarNumeroMesaNueva(nuevoNumero);
                }
              }}
              onBlur={() => validarNumeroMesaNueva(Number(numeroMesaNueva))}
              error={Boolean(errorNumeroMesaNueva)}
              helperText={errorNumeroMesaNueva}
              fullWidth
            />
            <TextField
              select
              label="Ubicación"
              size="small"
              value={ubicacionMesaNueva}
              onChange={(event) => {
                const nuevaUbicacion = event.target.value;
                setUbicacionMesaNueva(nuevaUbicacion);
                if (errorUbicacionMesaNueva) {
                  validarUbicacionMesaNueva(nuevaUbicacion);
                }
              }}
              onBlur={() => validarUbicacionMesaNueva(ubicacionMesaNueva)}
              error={Boolean(errorUbicacionMesaNueva)}
              helperText={errorUbicacionMesaNueva}
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
        </Stack>
      </Modal>

      <Modal
        open={abrirModal}
        onCancelar={cerrarModal}
        titulo={`Mesa #${mesaSeleccionada?.numero ?? ""} - Total a pagar: $${Number(
          mesaSeleccionada?.total ?? 0,
        ).toLocaleString("es-CO", { maximumFractionDigits: 0 })}`}
        onGuardar={guardarAsignacion}
        loadingBtnGuardar={loadingGuardar}
        mostrarBtnGuardar
        mostrarBtnCancelar
        btnGuardar="Guardar"
        width={680}
      >
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Controller
            name="reservaId"
            control={control}
            render={({ field }) => (
              <TextField
                select
                label="Reserva asociada (opcional)"
                size="small"
                fullWidth
                {...field}
              >
                <MenuItem value="">Sin reserva</MenuItem>
                {reservas.map((reserva) => (
                  <MenuItem key={reserva.id} value={String(reserva.id)}>
                    {reserva.nombre_cliente} - Mesa {reserva.numero_mesa}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="estadoMesa"
            control={control}
            render={({ field }) => (
              <TextField
                select
                label="Estado de la mesa"
                size="small"
                fullWidth
                {...field}
              >
                <MenuItem value="habilitada">Habilitada</MenuItem>
                <MenuItem value="ocupada">Ocupada</MenuItem>
              </TextField>
            )}
          />

          <Divider />

          <Typography sx={{ fontWeight: 600 }}>
            Registrar plato para la mesa (con o sin reserva)
          </Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
            <Controller
              name="platoId"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="Plato"
                  size="small"
                  fullWidth
                  {...field}
                >
                  <MenuItem value="">Selecciona un plato</MenuItem>
                  {inventarioPlatos.map((plato) => (
                    <MenuItem key={plato.id} value={String(plato.id)}>
                      {plato.nombre} - $
                      {Number(plato.valor_unitario ?? 0).toLocaleString(
                        "es-CO",
                        {
                          maximumFractionDigits: 0,
                        },
                      )}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="cantidadPlato"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Cantidad"
                  size="small"
                  type="number"
                  sx={{ width: { xs: "100%", md: 120 } }}
                  value={field.value}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value))
                  }
                />
              )}
            />
            <Button
              variant="contained"
              onClick={guardarPlato}
              disabled={
                loadingGuardar || !puedeAgregarPlato || !inventarioPlatos.length
              }
              sx={{ minWidth: 100 }}
            >
              Agregar
            </Button>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            Cantidad total de platos: {totalPlatosMesa}
          </Typography>

          <Stack spacing={1}>
            {platosEnEdicion.length ? (
              platosEnEdicion.map((plato) => (
                <Stack
                  key={plato.tempId}
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
                    {Number(plato.subtotal ?? 0).toLocaleString("es-CO", {
                      maximumFractionDigits: 0,
                    })}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => borrarPlato(plato.tempId)}
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
