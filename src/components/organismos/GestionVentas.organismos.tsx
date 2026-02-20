import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSnackbar } from "notistack";
import { consultarVentas } from "../../api/ventas";
import { ENCABEZADO_TABLA_VENTAS } from "../../constants/global.constants";
import type { IVenta } from "../../interface/ventas.interface";
import { formatearFechaSinConversionUTC } from "../../utils/formatearFechaSinConversionUTC";
import TablaEncabezado from "../moleculas/TablaEncabezado.moleculas";

const GestionVentas = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [fechaDesde, setFechaDesde] = useState<Dayjs | null>(dayjs());
  const [fechaHasta, setFechaHasta] = useState<Dayjs | null>(dayjs());
  const [openCalendarDesde, setOpenCalendarDesde] = useState(false);
  const [openCalendarHasta, setOpenCalendarHasta] = useState(false);
  const [ventas, setVentas] = useState<IVenta[]>([]);
  const [cargando, setCargando] = useState(false);
  const totalVentas = ventas.reduce(
    (acumulado, venta) => acumulado + Number(venta.total_venta ?? 0),
    0,
  );

  const rangoFechasValido = Boolean(
    fechaDesde && fechaHasta && !dayjs(fechaHasta).isBefore(fechaDesde, "day"),
  );

  const consultarListadoVentas = async () => {
    if (!fechaDesde || !fechaHasta) {
      setVentas([]);
      return;
    }
    if (dayjs(fechaHasta).isBefore(fechaDesde, "day")) {
      setVentas([]);
      return;
    }

    try {
      setCargando(true);
      const params = {
        fecha_desde: dayjs(fechaDesde).format("YYYY-MM-DD"),
        fecha_hasta: dayjs(fechaHasta).format("YYYY-MM-DD"),
      };
      const data = await consultarVentas(params);
      setVentas(data.ventas ?? []);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("No se pudo consultar ventas", { variant: "error" });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    consultarListadoVentas();
  }, []);

  return (
    <Box
      sx={{
        width: { xs: "auto", md: "800px" },
        maxWidth: { xs: "100vw", md: "none" },
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        sx={{ mb: 2 }}
        spacing={1}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
            Ventas
          </Typography>
          <Typography
            sx={{ fontSize: "16px", fontWeight: 600, color: "text.secondary" }}
          >
            Total: $
            {totalVentas.toLocaleString("es-CO", { maximumFractionDigits: 0 })}
          </Typography>
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DatePicker
              label="Desde"
              open={openCalendarDesde}
              onOpen={() => setOpenCalendarDesde(true)}
              onClose={() => setOpenCalendarDesde(false)}
              value={fechaDesde}
              onChange={(nuevaFecha) => setFechaDesde(nuevaFecha)}
              slotProps={{
                textField: {
                  size: "small",
                  sx: {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "10px",
                    width: { xs: "100%", sm: 170 },
                  },
                },
              }}
            />
            <DatePicker
              label="Hasta"
              open={openCalendarHasta}
              onOpen={() => setOpenCalendarHasta(true)}
              onClose={() => setOpenCalendarHasta(false)}
              value={fechaHasta}
              onChange={(nuevaFecha) => setFechaHasta(nuevaFecha)}
              slotProps={{
                textField: {
                  size: "small",
                  sx: {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "10px",
                    width: { xs: "100%", sm: 170 },
                  },
                },
              }}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            disabled={cargando || !rangoFechasValido}
            onClick={consultarListadoVentas}
          >
            Consultar
          </Button>
        </Stack>
      </Stack>

      <Paper
        sx={{ width: { xs: "250px", md: "100%" }, my: 2, overflowX: "auto" }}
      >
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TablaEncabezado encabezado={ENCABEZADO_TABLA_VENTAS} />
              </TableRow>
            </TableHead>
            <TableBody>
              {cargando ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : ventas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Sin resultado
                  </TableCell>
                </TableRow>
              ) : (
                ventas.map((venta) => (
                  <TableRow key={venta.id} hover>
                    <TableCell align="left">{venta.numero_mesa}</TableCell>
                    <TableCell align="right">
                      {formatearFechaSinConversionUTC(venta.created_at)}
                    </TableCell>
                    <TableCell align="right">
                      $
                      {Number(venta.total_venta ?? 0).toLocaleString("es-CO", {
                        maximumFractionDigits: 0,
                      })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default GestionVentas;
