import { axiosInstance } from "./axiosInstance";
import {
  EstadoMesa,
  IAgregarPlatoMesaPayload,
  IMesaPlato,
  IMesa,
} from "../interface/mesas.interface";

interface IListarMesasResponse {
  mesas: IMesa[];
}

export async function listarMesas() {
  return axiosInstance.get<IListarMesasResponse>("/mesas").then(({ data }) => {
    return data.mesas ?? [];
  });
}

export async function asignarReservaMesa(idMesa: number, reservaId: number | null) {
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
  payload: IAgregarPlatoMesaPayload
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

interface ICrearMesaPayload {
  numero: number;
  ubicacion: string;
  estado: EstadoMesa;
  reserva_id: number | null;
  platos: Array<Pick<IMesaPlato, "nombre" | "cantidad" | "precio_unitario">>;
}

export async function crearMesas(mesas: ICrearMesaPayload[]) {
  return axiosInstance.post("/mesas", { mesas }).then(({ data }) => data);
}
