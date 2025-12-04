import { axiosInstance } from "./axiosInstance";
import { EstadisticaMensual } from "../interface/general";

export async function obtenerEstadisticasMensuales(): Promise<
  EstadisticaMensual[]
> {
  try {
    const { data } = await axiosInstance.get("/estadisticas-reservas");
    return data;
  } catch (err) {
    console.error("Error al obtener estadísticas:", err);
    throw err;
  }
}
