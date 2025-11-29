import axios from "axios";
import { GESTIONAR_RESERVAS } from "../Env";

export async function registrarTipoReserva(nombre_tipo_reserva: string) {
  const url = `${GESTIONAR_RESERVAS}/tipo-reservas`;

  return axios
    .post(
      url,
      { nombre_tipo_reserva },
      {
        withCredentials: true, // 🔥 Reemplaza al header Authorization
      }
    )
    .then(({ data }) => data)
    .catch((err) => {
      console.error("Error al registrar tipo de reserva:", err);
      throw err;
    });
}

export async function obtenerTiposReserva() {
  const url = `${GESTIONAR_RESERVAS}/tipo-reservas`;

  return axios
    .get(url, {
      withCredentials: true, // 🔥 Necesario para enviar la cookie al backend
    })
    .then(({ data }) => data)
    .catch((err) => {
      console.error("Error al obtener tipos de reserva:", err);
      throw err;
    });
}
