export interface IListaTiposReservas {
  id: number;
  nombre_tipo_reserva: string;
  created_at: string;
}

export interface IListadoGestionTiposReservas {
  dataListadoTiposReservas: IListaTiposReservas[];
  cargando: boolean;
}

export interface IModalDetalleReservas {
  abrirModalDetalleReservas: boolean;
  setAbrirModalDetalleReservas: React.Dispatch<React.SetStateAction<boolean>>;
  detalle: string;
  nombreCliente: string;
}
