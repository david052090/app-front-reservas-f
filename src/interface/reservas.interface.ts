export interface IDataReservas {
  id: number;
  nombre_cliente: string;
  celular: string;
  fecha: string;
  hora: string;
  cantidad_personas: number;
  numero_mesa: number;
  tipo_reserva: string;
  estado_reserva: string;
}
export interface IListadoReservas {
  dataListadoReservas: IDataReservas[];
}
