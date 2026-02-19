import { useEffect, useMemo, useState } from "react";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import CurrencyFormat from "react-currency-format";
import { Controller, useForm } from "react-hook-form";
import EncabezadoReservas from "../moleculas/EncabezadoReservas.moleculas";
import Modal from "../moleculas/Modal.moleculas";
import TablaEncabezado from "../moleculas/TablaEncabezado.moleculas";
import { ENCABEZADO_TABLA_INVENTARIOS } from "../../constants/global.constants";
import {
  actualizarInventarioPlato,
  crearInventarioPlato,
  eliminarInventarioPlato,
  listarInventarioPlatos,
} from "../../api/inventarioPlatos";
import {
  IInventarioPlato,
  IInventarioPlatoPayload,
  IInventarioFormulario,
} from "../../interface/inventario.interface";

const estadoInicialFormulario: IInventarioFormulario = {
  nombre: "",
  cantidad_disponible: 0,
  valor_unitario: "",
};

const GestionInventarios = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [itemsInventario, setItemsInventario] = useState<IInventarioPlato[]>(
    [],
  );
  const [cargando, setCargando] = useState(false);

  const [abrirModalFormulario, setAbrirModalFormulario] = useState(false);
  const [itemEditar, setItemEditar] = useState<IInventarioPlato | null>(null);
  const [loadingGuardar, setLoadingGuardar] = useState(false);

  const [abrirModalEliminar, setAbrirModalEliminar] = useState(false);
  const [itemEliminar, setItemEliminar] = useState<IInventarioPlato | null>(
    null,
  );
  const [loadingEliminar, setLoadingEliminar] = useState(false);

  const { control, getValues, reset, watch } = useForm<IInventarioFormulario>({
    defaultValues: estadoInicialFormulario,
  });
  const [nombreForm, cantidadForm, valorUnitarioForm] = watch([
    "nombre",
    "cantidad_disponible",
    "valor_unitario",
  ]);

  const listarInventario = async () => {
    try {
      setCargando(true);
      const data = await listarInventarioPlatos();
      setItemsInventario(data);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("No se pudo obtener el inventario", {
        variant: "error",
      });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    listarInventario();
  }, []);

  const abrirEditar = (item: IInventarioPlato) => {
    setItemEditar(item);
    reset({
      nombre: item.nombre,
      cantidad_disponible: Number(item.cantidad_disponible),
      valor_unitario: String(Number(item.valor_unitario)),
    });
    setAbrirModalFormulario(true);
  };

  const cerrarModalFormulario = () => {
    setAbrirModalFormulario(false);
    setItemEditar(null);
    reset(estadoInicialFormulario);
  };

  const guardarItemInventario = async () => {
    const formulario = getValues();
    const nombre = formulario.nombre.trim();
    const cantidad = Number(formulario.cantidad_disponible);
    const valorUnitario = Number(formulario.valor_unitario);

    if (!nombre) {
      enqueueSnackbar("El nombre es obligatorio", { variant: "warning" });
      return;
    }

    if (!Number.isFinite(cantidad) || cantidad < 0) {
      enqueueSnackbar("La cantidad disponible debe ser mayor o igual a 0", {
        variant: "warning",
      });
      return;
    }

    if (!Number.isFinite(valorUnitario) || valorUnitario < 0) {
      enqueueSnackbar("El valor unitario debe ser mayor o igual a 0", {
        variant: "warning",
      });
      return;
    }

    try {
      setLoadingGuardar(true);
      const payload: IInventarioPlatoPayload = {
        nombre,
        cantidad_disponible: cantidad,
        valor_unitario: valorUnitario,
      };

      if (itemEditar) {
        await actualizarInventarioPlato(itemEditar.id, payload);
        enqueueSnackbar("Ítem actualizado correctamente", {
          variant: "success",
        });
      } else {
        await crearInventarioPlato(payload);
        enqueueSnackbar("Ítem creado correctamente", { variant: "success" });
      }

      cerrarModalFormulario();
      await listarInventario();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("No se pudo guardar el ítem", { variant: "error" });
    } finally {
      setLoadingGuardar(false);
    }
  };

  const abrirConfirmacionEliminar = (item: IInventarioPlato) => {
    setItemEliminar(item);
    setAbrirModalEliminar(true);
  };

  const eliminarItemInventario = async () => {
    if (!itemEliminar) return;

    try {
      setLoadingEliminar(true);
      await eliminarInventarioPlato(itemEliminar.id);
      enqueueSnackbar("Ítem eliminado correctamente", { variant: "success" });
      setAbrirModalEliminar(false);
      setItemEliminar(null);
      await listarInventario();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("No se pudo eliminar el ítem", { variant: "error" });
    } finally {
      setLoadingEliminar(false);
    }
  };

  const guardarDeshabilitado = useMemo(() => {
    const cantidad = Number(cantidadForm);
    const valorUnitario = Number(valorUnitarioForm);
    return (
      !nombreForm?.trim() ||
      !Number.isFinite(cantidad) ||
      cantidad < 0 ||
      valorUnitarioForm === "" ||
      !Number.isFinite(valorUnitario) ||
      valorUnitario < 0
    );
  }, [cantidadForm, nombreForm, valorUnitarioForm]);

  return (
    <>
      <Box
        sx={{
          width: { xs: "auto", md: "920px" },
          maxWidth: { xs: "100vw", md: "none" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box>
            <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
              Inventarios
            </Typography>
          </Box>
          <EncabezadoReservas
            setAbrirModalReservas={(value) => {
              const abrir =
                typeof value === "function"
                  ? value(abrirModalFormulario)
                  : value;
              if (abrir) {
                setItemEditar(null);
                reset(estadoInicialFormulario);
              }
              setAbrirModalFormulario(abrir);
            }}
            actualizarTabla={listarInventario}
            textoBtn="Agregar"
          />
        </Box>

        <Paper
          sx={{ width: { xs: "250px", md: "100%" }, my: 3, overflowX: "auto" }}
        >
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TablaEncabezado encabezado={ENCABEZADO_TABLA_INVENTARIOS} />
                </TableRow>
              </TableHead>
              <TableBody>
                {cargando ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : itemsInventario.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      Sin ítems registrados
                    </TableCell>
                  </TableRow>
                ) : (
                  itemsInventario.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>{item.nombre}</TableCell>
                      <TableCell align="right">
                        {item.cantidad_disponible}
                      </TableCell>
                      <TableCell align="right">
                        $
                        {Number(item.valor_unitario ?? 0).toLocaleString(
                          "es-CO",
                          {
                            maximumFractionDigits: 0,
                          },
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Stack
                          direction="row"
                          justifyContent="center"
                          spacing={1}
                        >
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => abrirEditar(item)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => abrirConfirmacionEliminar(item)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <Modal
        open={abrirModalFormulario}
        onCancelar={cerrarModalFormulario}
        titulo={itemEditar ? "Editar ítem" : "Agregar ítem"}
        onGuardar={guardarItemInventario}
        loadingBtnGuardar={loadingGuardar}
        disabledBtnGuardar={guardarDeshabilitado}
        mostrarBtnGuardar
        mostrarBtnCancelar
        btnGuardar={itemEditar ? "Actualizar" : "Guardar"}
        width={620}
      >
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Controller
            name="nombre"
            control={control}
            render={({ field }) => (
              <TextField label="Nombre" size="small" fullWidth {...field} />
            )}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <Controller
              name="cantidad_disponible"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Cantidad disponible"
                  size="small"
                  type="number"
                  fullWidth
                  value={field.value}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value))
                  }
                />
              )}
            />
            <Controller
              name="valor_unitario"
              control={control}
              render={({ field }) => (
                <CurrencyFormat
                  customInput={TextField}
                  label="Valor unitario"
                  size="small"
                  fullWidth
                  value={field.value === "" ? undefined : field.value}
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={2}
                  allowNegative={false}
                  onValueChange={(values: { value?: string }) =>
                    field.onChange(values.value || "")
                  }
                />
              )}
            />
          </Stack>
        </Stack>
      </Modal>

      <Modal
        open={abrirModalEliminar}
        onCancelar={() => {
          setAbrirModalEliminar(false);
          setItemEliminar(null);
        }}
        titulo="Eliminar ítem"
        onGuardar={eliminarItemInventario}
        loadingBtnGuardar={loadingEliminar}
        mostrarBtnGuardar
        mostrarBtnCancelar
        btnGuardar="Eliminar"
        width={450}
      >
        <Typography sx={{ pt: 2 }}>
          ¿Deseas eliminar el ítem
          <b> {itemEliminar?.nombre ?? ""}</b>?
        </Typography>
      </Modal>
    </>
  );
};

export default GestionInventarios;
