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

export interface FormValues {
  nombre_cliente: string;
  celular: string;
  cantidad_personas: number;
  fecha: string;
  hora: string;
  tipo_reserva: string;
  numero_mesa: number;
  estado_reserva: string;
}

export interface IModalRegistroReservas {
  setAbrirModalReservas: React.Dispatch<React.SetStateAction<boolean>>;
  abrirModalReservas: boolean;
}
