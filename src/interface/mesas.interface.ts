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
