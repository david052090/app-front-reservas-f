import { EstadoMesa, IMesaPlato } from "./mesas.interface";
export interface IInventarioPlato {
  id: number;
  nombre: string;
  cantidad_disponible: number;
  valor_unitario: number;
  created_at?: string;
  updated_at?: string;
}

export interface IInventarioPlatoPayload {
  nombre: string;
  cantidad_disponible: number;
  valor_unitario: number;
}

export interface ICrearMesaPayload {
  numero: number;
  ubicacion: string;
  estado: EstadoMesa;
  reserva_id: number | null;
  platos: Array<Pick<IMesaPlato, "nombre" | "cantidad" | "precio_unitario">>;
}

export interface IListarInventarioResponse {
  inventario?: IInventarioPlato[];
  inventario_platos?: IInventarioPlato[];
  platos?: IInventarioPlato[];
  data?: IInventarioPlato[];
}

export interface IInventarioFormulario {
  nombre: string;
  cantidad_disponible: number;
  valor_unitario: string;
}
