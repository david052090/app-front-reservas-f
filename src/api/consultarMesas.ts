import { axiosInstance } from "./axiosInstance";
import type {
  ICrearMesaPayload,
  IPatchMesaBatchPayload,
  IListarMesasResponse,
  EstadoMesa,
  IAgregarPlatoMesaPayload,
} from "../interface/mesas.interface";

export async function listarMesas() {
  return axiosInstance.get<IListarMesasResponse>("/mesas").then(({ data }) => {
    return data.mesas ?? [];
  });
}

export async function asignarReservaMesa(
  idMesa: number,
  reservaId: number | null,
) {
  return axiosInstance
    .patch(`/mesas/${idMesa}/reserva`, { reserva_id: reservaId })
    .then(({ data }) => data);
}

export async function actualizarEstadoMesa(idMesa: number, estado: EstadoMesa) {
  return axiosInstance
    .patch(`/mesas/${idMesa}/estado`, { estado })
    .then(({ data }) => data);
}

export async function agregarPlatoMesa(
  idMesa: number,
  payload: IAgregarPlatoMesaPayload,
) {
  return axiosInstance
    .post(`/mesas/${idMesa}/platos`, payload)
    .then(({ data }) => data);
}

export async function eliminarPlatoMesa(idMesa: number, idPlatoMesa: number) {
  return axiosInstance
    .delete(`/mesas/${idMesa}/platos/${idPlatoMesa}`)
    .then(({ data }) => data);
}

export async function patchMesaBatch(
  idMesa: number,
  payload: IPatchMesaBatchPayload,
) {
  return axiosInstance
    .patch(`/mesas/${idMesa}`, payload)
    .then(({ data }) => data);
}

export async function crearMesas(mesas: ICrearMesaPayload[]) {
  return axiosInstance.post("/mesas", { mesas }).then(({ data }) => data);
}
