import { Dayjs } from "dayjs";
export interface IDataReservas {
  id: number;
  nombre_cliente: string;
  celular: string;
  fecha: string;
  hora: string;
  cantidad_personas: number;
  numero_mesa: number;
  tipo_reserva: string;
  estado_reserva: number;
  observacion: string;
  ubicacion: string;
  usuario_nombre: string;
  usuario_email: string;
  created_at: string;
}
export interface IListadoReservas {
  dataListadoReservas: IDataReservas[];
  cargando: boolean;
  setAbrirModalEditar: React.Dispatch<React.SetStateAction<boolean>>;
  setReservaEditar: React.Dispatch<React.SetStateAction<IDataReservas | null>>;
  setDetalleReserva: React.Dispatch<React.SetStateAction<string>>;
  setAbrirModalDetalleReservas: React.Dispatch<React.SetStateAction<boolean>>;
  setNombreCliente: React.Dispatch<React.SetStateAction<string>>;
  setAbrirModalEliminarReservas: React.Dispatch<React.SetStateAction<boolean>>;
  setEliminarReservas: React.Dispatch<React.SetStateAction<IEliminarReserva>>;
  setAbrirModalDetalleUsuarios: React.Dispatch<React.SetStateAction<boolean>>;
  setUsuarioDetalle: React.Dispatch<
    React.SetStateAction<IDataModalDetalleUsuarios | null>
  >;
}
export interface IConsultarReservas {
  fecha?: string;
  nombreCliente?: string;
}
export interface IEncabezadoReservas {
  setAbrirModalReservas: React.Dispatch<React.SetStateAction<boolean>>;
  actualizarTabla: () => void;
  filtro?: string;
  setFiltro?: React.Dispatch<React.SetStateAction<string>>;
  filtroFecha?: Dayjs | null;
  setFiltroFecha?: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  mostrarBuscador?: boolean;
  mostrarFecha?: boolean;
  reservasHoy?: number;
  reservasFuturas?: number;
  mostrarContadores?: boolean;
  textoBtn?: string;
}

export interface IEliminarReserva {
  id: number;
  nombreCliente?: string;
}

export interface IModalAdvertencia {
  abrirModalEliminarReservas: boolean;
  setAbrirModalEliminarReservas: React.Dispatch<React.SetStateAction<boolean>>;
  nombreCliente?: string;
  onEliminar: () => void;
  loadingBtnEliminar: boolean;
}
export interface IDataModalDetalleUsuarios {
  usuario_nombre: string;
  usuario_email: string;
  created_at: string;
}
export interface IModalDetalleUsuarios {
  abrirModalDetalleUsuarios: boolean;
  setAbrirModalDetalleUsuarios: React.Dispatch<React.SetStateAction<boolean>>;
  dataModalDetalleUsuarios: IDataModalDetalleUsuarios | null;
}
