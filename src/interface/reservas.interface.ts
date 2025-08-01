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
}
