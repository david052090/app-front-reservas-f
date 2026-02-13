import { IDataReservas } from "./reservas.interface";
import { Dayjs } from "dayjs";
export interface FormInputsRegistrar {
  nombre: string;
  nombre_restaurante: string;
  nit: string;
  email: string;
  password: string;
}

export interface LoginInputs {
  email: string;
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
  id?: number;
  nombre_cliente: string;
  celular: string;
  cantidad_personas: number;
  fecha: string | Dayjs;
  hora: string | Dayjs;
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
  setAbrirModalModalErrorAdvertencia: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setTextErrorResponse: React.Dispatch<React.SetStateAction<string>>;
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
  reservaEditar: IDataReservas | null;
  actualizarData: () => void;
}
