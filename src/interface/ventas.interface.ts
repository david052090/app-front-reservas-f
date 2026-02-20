export interface IVenta {
  id: number;
  id_mesa: number;
  numero_mesa: number;
  fecha_venta: string;
  total_venta: string | number;
  created_at: string;
}

export interface IConsultarVentasHoyResponse {
  ok: boolean;
  fecha?: string;
  ventas?: IVenta[];
}
