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
}
export interface IListadoReservas {
  dataListadoReservas: IDataReservas[];
  cargando: boolean;
  setAbrirModalEditar: React.Dispatch<React.SetStateAction<boolean>>;
  setReservaEditar: React.Dispatch<React.SetStateAction<IDataReservas | null>>;
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  selected: number[];
  setSelectedData: React.Dispatch<React.SetStateAction<IDataReservas[]>>;
  selectedData: IDataReservas[];
  setDetalleReserva: React.Dispatch<React.SetStateAction<string>>;
  setAbrirModalDetalleReservas: React.Dispatch<React.SetStateAction<boolean>>;
  setNombreCliente: React.Dispatch<React.SetStateAction<string>>;
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
}
