export interface IListaTiposReservas {
  id: number;
  nombre_tipo_reserva: string;
  created_at: string;
}

export interface IListadoGestionTiposReservas {
  dataListadoTiposReservas: IListaAmbientes[];
  cargando: boolean;
}
