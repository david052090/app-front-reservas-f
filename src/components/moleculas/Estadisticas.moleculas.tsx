import { useEffect, useMemo, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { obtenerEstadisticasMensuales } from "../../api/estadisticas";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { EstadisticaMensual } from "../../interface/general";

const meses = [
  "",
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

export default function EstadisticasChart() {
  const [data, setData] = useState<EstadisticaMensual[]>([]);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const anioActual = new Date().getFullYear();
  const [anioSeleccionado, setAnioSeleccionado] = useState<number>(anioActual);

  // Lista de años (últimos 6 por ejemplo)
  const anios = useMemo(() => {
    const cantidad = 6;
    return Array.from({ length: cantidad }, (_, i) => anioActual - i);
  }, [anioActual]);

  useEffect(() => {
    obtenerEstadisticasMensuales(anioSeleccionado)
      .then((res) => setData(res))
      .catch(console.error);
  }, [anioSeleccionado]);

  // Completa 12 meses para el año seleccionado
  const mesesCompletos = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const mes = i + 1;
      const existente = data.find(
        (d) => d.anio === anioSeleccionado && d.mes === mes
      );
      return {
        mes,
        anio: anioSeleccionado,
        confirmadas: existente?.confirmadas ?? 0,
        canceladas: existente?.canceladas ?? 0,
      };
    });
  }, [data, anioSeleccionado]);

  const labels = mesesCompletos.map(
    (item) => `${meses[item.mes]} ${item.anio}`
  );
  const confirmadas = mesesCompletos.map((item) => item.confirmadas);
  const canceladas = mesesCompletos.map((item) => item.canceladas);

  const chartHeight = isSmall ? 250 : 400;

  return (
    <Box
      sx={{
        width: { xs: "auto", md: "1000px" },
        maxWidth: { xs: "100vw", md: "none" },
        mx: 0,
        px: 0,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="h6">
          Estadísticas de Reservas ({anioSeleccionado})
        </Typography>

        <FormControl size="small" sx={{ minWidth: 100 }}>
          <InputLabel id="anio-label">Año</InputLabel>
          <Select
            labelId="anio-label"
            value={anioSeleccionado}
            label="Año"
            onChange={(e) => setAnioSeleccionado(Number(e.target.value))}
          >
            {anios.map((a) => (
              <MenuItem key={a} value={a}>
                {a}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <BarChart
        height={chartHeight}
        xAxis={[{ id: "mes", data: labels, scaleType: "band" }]}
        series={[
          { data: confirmadas, label: "Confirmadas" },
          { data: canceladas, label: "Canceladas" },
        ]}
      />
    </Box>
  );
}
