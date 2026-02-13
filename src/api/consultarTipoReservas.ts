import { axiosInstance } from "./axiosInstance";

// 📌 Registrar un tipo de reserva
export async function registrarTipoReserva(nombre_tipo_reserva: string) {
  return axiosInstance
    .post("/tipo-reservas", { nombre_tipo_reserva })
    .then(({ data }) => data)
    .catch((err) => {
      console.error("Error al registrar tipo de reserva:", err);
      throw err;
    });
}

// 📌 Obtener todos los tipos de reserva
export async function obtenerTiposReserva() {
  return axiosInstance
    .get("/tipo-reservas")
    .then(({ data }) => data)
    .catch((err) => {
      console.error("Error al obtener tipos de reserva:", err);
      throw err;
    });
}
