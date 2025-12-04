import { axiosInstance } from "./axiosInstance";

export async function registrarAmbiente(nombre_ambiente: string) {
  return axiosInstance
    .post("/ambientes", { nombre_ambiente })
    .then(({ data }) => data)
    .catch((err) => {
      console.error("Error al crear ambiente:", err);
      throw err;
    });
}

export async function obtenerAmbientes() {
  return axiosInstance
    .get("/ambientes")
    .then(({ data }) => data)
    .catch((err) => {
      console.error("Error al obtener ambientes:", err);
      throw err;
    });
}
