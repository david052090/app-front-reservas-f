export interface ITablaEncabezado {
  id: string;
  label: string;
  align?: "left" | "center" | "right" | "justify" | "inherit";
  ocultar?: boolean;
  width?: string;
  maxWidth?: string;
  minWidth?: string;
  ocultarOrden?: boolean;
  padding?: string;
  paddingLeft?: string;
  paddingRight?: string;
  fontWeight?: number;
  iconoOrdenar?: boolean;
  bloquearConsulta?: boolean;
  border?: string;
}

export interface IEncabezadoDataTablaOrdenar {
  encabezado: Array<ITablaEncabezado>;
  order?: "asc" | "desc";
  orderBy?: string;
  manejadorOrdenamiento?: (property: string) => void;
}

export interface IBotonRedondo {
  texto: string;
  icono?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isReporte?: boolean;
  isDownloading?: boolean;
  width?: string;
}
export interface EstadisticaMensual {
  mes: number;
  anio: number;
  confirmadas: number;
  canceladas: number;
}
export interface IRegistroUsuario {
  nombre: string;
  nombre_restaurante: string;
  nit: string;
  email: string;
  password: string;
}
export interface ILoginUsuario {
  nombre: string;
  password: string;
}
