import axios from "axios";
import { GESTIONAR_RESERVAS } from "../Env";
import { FormValues } from "../interface/formularios.interface";
import { IConsultarReservas } from "../interface/reservas.interface";

export async function gestionarListadoReservas({
  fecha,
  nombreCliente,
}: IConsultarReservas) {
  const params = new URLSearchParams();
  if (fecha) params.append("fecha", fecha);
  if (nombreCliente) params.append("nombre_cliente", nombreCliente);

  const url = `${GESTIONAR_RESERVAS}/reservas?${params.toString()}`;

  return axios
    .get(url, {
      withCredentials: true, // 🔥 Importante
    })
    .then(({ data }) => data);
}

export async function dataRegistrarReserva(
  dataReserva: Omit<FormValues, "userId">
) {
  const url = `${GESTIONAR_RESERVAS}/reservas`;

  return axios
    .post(url, dataReserva, {
      withCredentials: true, // 🔥 Importante
    })
    .then(({ data }) => data);
}

export async function actualizarReserva(data: FormValues & { id: number }) {
  const { id, ...body } = data;
  const url = `${GESTIONAR_RESERVAS}/reservas/${id}`;

  return axios
    .patch(url, body, {
      withCredentials: true, // 🔥 Importante
    })
    .then(({ data }) => data);
}

export async function eliminarReserva(id: number) {
  const url = `${GESTIONAR_RESERVAS}/reservas/${id}`;

  return axios
    .delete(url, {
      withCredentials: true, // 🔥 Importante
    })
    .then(({ data }) => data);
}
