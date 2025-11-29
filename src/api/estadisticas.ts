import axios from "axios";
import { GESTIONAR_RESERVAS } from "../Env";
import { EstadisticaMensual } from "../interface/general";

export async function obtenerEstadisticasMensuales(): Promise<
  EstadisticaMensual[]
> {
  const url = `${GESTIONAR_RESERVAS}/estadisticas-reservas`;

  return axios
    .get(url, {
      withCredentials: true, // 🔥 Necesario para enviar la cookie
    })
    .then(({ data }) => data)
    .catch((err) => {
      console.error("Error al obtener estadísticas:", err);
      throw err;
    });
}
