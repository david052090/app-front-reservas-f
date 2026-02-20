import { axiosInstance } from "./axiosInstance";
import type { IConsultarVentasHoyResponse } from "../interface/ventas.interface";

interface IConsultarVentasParams {
  fecha?: string;
  fecha_desde?: string;
  fecha_hasta?: string;
}

export async function consultarVentas(params?: IConsultarVentasParams) {
  return axiosInstance
    .get<IConsultarVentasHoyResponse>("/ventas/hoy", {
      params,
    })
    .then(({ data }) => data);
}
