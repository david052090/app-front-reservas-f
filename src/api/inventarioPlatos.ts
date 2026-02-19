import { axiosInstance } from "./axiosInstance";
import { IListarInventarioResponse } from "../interface/inventario.interface";
import {
  IInventarioPlato,
  IInventarioPlatoPayload,
} from "../interface/inventario.interface";

export async function listarInventarioPlatos() {
  return axiosInstance
    .get<IListarInventarioResponse>("/inventario-platos")
    .then(({ data }) => {
      return data;
    });
}

export async function crearInventarioPlato(payload: IInventarioPlatoPayload) {
  return axiosInstance
    .post("/inventario-platos", payload)
    .then(({ data }) => data);
}

export async function actualizarInventarioPlato(
  id: number,
  payload: Partial<IInventarioPlatoPayload>,
) {
  return axiosInstance
    .patch(`/inventario-platos/${id}`, payload)
    .then(({ data }) => data);
}

export async function eliminarInventarioPlato(id: number) {
  return axiosInstance
    .delete(`/inventario-platos/${id}`)
    .then(({ data }) => data);
}
