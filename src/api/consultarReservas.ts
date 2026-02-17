import { axiosInstance } from "./axiosInstance";
import { FormValues } from "../interface/formularios.interface";
import { IConsultarReservas } from "../interface/reservas.interface";

export async function gestionarListadoReservas({
  fecha,
  hora,
  nombreCliente,
  ubicacion,
}: IConsultarReservas) {
  const params = new URLSearchParams();
  if (fecha) params.append("fecha", fecha);
  if (hora) params.append("hora", hora);
  if (nombreCliente) params.append("nombre_cliente", nombreCliente);
  if (ubicacion) params.append("ubicacion", ubicacion);

  return axiosInstance
    .get(`/reservas?${params.toString()}`)
    .then(({ data }) => data);
}

export async function dataRegistrarReserva(
  dataReserva: Omit<FormValues, "userId">
) {
  return axiosInstance.post(`/reservas`, dataReserva).then(({ data }) => data);
}

export async function actualizarReserva(data: FormValues & { id: number }) {
  const { id, ...body } = data;

  return axiosInstance.patch(`/reservas/${id}`, body).then(({ data }) => data);
}

export async function eliminarReserva(id: number) {
  return axiosInstance.delete(`/reservas/${id}`).then(({ data }) => data);
}
