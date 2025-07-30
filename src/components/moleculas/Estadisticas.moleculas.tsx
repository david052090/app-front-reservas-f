import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { obtenerEstadisticasMensuales } from "../../api/estadisticas";
import { Box, Typography } from "@mui/material";
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

  useEffect(() => {
    obtenerEstadisticasMensuales()
      .then((res) => setData(res))
      .catch(console.error);
  }, []);

  // Año que quieres mostrar (puede venir como prop o seleccionarse)
  const anioActual = new Date().getFullYear();

  // Genera los datos de los 12 meses con confirmadas y canceladas en 0
  const mesesCompletos = Array.from({ length: 12 }, (_, i) => {
    const mes = i + 1;
    const existente = data.find((d) => d.anio === anioActual && d.mes === mes);
    return {
      mes,
      anio: anioActual,
      confirmadas: existente?.confirmadas || 0,
      canceladas: existente?.canceladas || 0,
    };
  });

  const labels = mesesCompletos.map(
    (item) => `${meses[item.mes]} ${item.anio}`
  );
  const confirmadas = mesesCompletos.map((item) => item.confirmadas);
  const canceladas = mesesCompletos.map((item) => item.canceladas);

  return (
    <Box sx={{ width: "1000px", maxWidth: 1000 }}>
      <Typography variant="h6" mb={2}>
        Estadísticas de Reservas ({anioActual})
      </Typography>
      <BarChart
        height={400}
        xAxis={[{ id: "mes", data: labels, scaleType: "band" }]}
        series={[
          { data: confirmadas, label: "Confirmadas", color: "#4caf50" },
          { data: canceladas, label: "Canceladas", color: "#f44336" },
        ]}
      />
    </Box>
  );
}
