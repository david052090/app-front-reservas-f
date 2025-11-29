import axios from "axios";
import { GESTIONAR_RESERVAS } from "../Env";

export async function registrarAmbiente(nombre_ambiente: string) {
  const url = `${GESTIONAR_RESERVAS}/ambientes`;

  return axios
    .post(
      url,
      { nombre_ambiente },
      {
        withCredentials: true, // 🔥 Importante
      }
    )
    .then(({ data }) => data)
    .catch((err) => {
      console.error("Error al crear ambiente:", err);
      throw err;
    });
}

export async function obtenerAmbientes() {
  const url = `${GESTIONAR_RESERVAS}/ambientes`;

  return axios
    .get(url, {
      withCredentials: true, // 🔥 Importante
    })
    .then(({ data }) => data)
    .catch((err) => {
      console.error("Error al obtener ambientes:", err);
      throw err;
    });
}
