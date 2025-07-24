import { IDataReservas } from "./reservas.interface";
export interface FormInputsRegistrar {
  nombre: string;
  nombre_restaurante: string;
  nit: string;
  email: string;
  password: string;
}

export interface LoginInputs {
  nombre_restaurante: string;
  password: string;
}

export interface ITiposAmbientesReservas {
  id: number;
  nombre_ambiente: string;
}

export interface ITiposReservas {
  id: number;
  nombre_tipo_reserva: string;
}
export interface FormValues {
  nombre_cliente: string;
  celular: string;
  cantidad_personas: number;
  fecha: string;
  hora: string;
  tipo_reserva: string;
  numero_mesa: number;
  estado_reserva: boolean;
  ubicacion: string;
  observacion: string;
}

export interface IModalRegistroReservas {
  setAbrirModalReservas: React.Dispatch<React.SetStateAction<boolean>>;
  abrirModalReservas: boolean;
  actualizarData: () => void;
}

export interface IModalRegistroAmbiente {
  setAbrirModalAmbiente: React.Dispatch<React.SetStateAction<boolean>>;
  abrirModalAmbiente: boolean;
  actualizarData: () => void;
}
export interface IModalRegistroTipoReservas {
  setAbrirModalTipoReservas: React.Dispatch<React.SetStateAction<boolean>>;
  abrirModalTipoReservas: boolean;
  actualizarData: () => void;
}
export interface IModalEditarReserva {
  abrirModalEditar: boolean;
  setAbrirModalEditar: React.Dispatch<React.SetStateAction<boolean>>;
  reservaEditar: FormValues | null;
  actualizarData: () => void;
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  setSelectedData: React.Dispatch<React.SetStateAction<IDataReservas[]>>;
}
