import axios from "axios";
import { GESTIONAR_RESERVAS } from "../Env";

export async function registrarAmbiente(nombre_ambiente: string) {
  const token = localStorage.getItem("authToken");
  const url = GESTIONAR_RESERVAS + `/ambientes`;

  return axios
    .post(
      url,
      { nombre_ambiente },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => {
      console.error("Error al crear ambiente:", err);
      throw err;
    });
}

export async function obtenerAmbientes() {
  const token = localStorage.getItem("authToken");
  const url = GESTIONAR_RESERVAS + `/ambientes`;

  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => data)
    .catch((err) => {
      console.error("Error al obtener ambientes:", err);
      throw err;
    });
}
