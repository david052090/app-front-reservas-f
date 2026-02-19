export type EstadoMesa = "habilitada" | "ocupada";

export interface IMesaPlato {
  id: number;
  nombre: string;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

export interface IMesaReservaAsignada {
  id: number;
  nombre_cliente: string;
}

export interface IMesa {
  id: number;
  numero: number;
  ubicacion?: string;
  estado: EstadoMesa;
  reserva?: IMesaReservaAsignada | null;
  platos: IMesaPlato[];
  total: number;
}

export interface IAgregarPlatoMesaPayload {
  nombre: string;
  cantidad: number;
  precio_unitario: number;
}

export interface IPatchMesaBatchPayload {
  reserva_id?: number | null;
  estado?: EstadoMesa;
  platos_agregar?: IAgregarPlatoMesaPayload[];
  platos_eliminar?: number[];
}

export interface IListarMesasResponse {
  mesas: IMesa[];
}

export interface IPlatoEnEdicion {
  id?: number;
  inventarioId?: number;
  nombre: string;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  tempId: string;
}

export interface IFormGestionMesa {
  reservaId: string;
  estadoMesa: EstadoMesa;
  platoId: string;
  cantidadPlato: number;
}
