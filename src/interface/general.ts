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
  width?: object;
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
  email: string;
  password: string;
}
export interface IModal {
  titulo?: string;
  isSobrante?: boolean;
  children: React.ReactNode;
  onCancelar: () => void;
  onGuardar?: () => void;
  loadingBtnGuardar?: boolean;
  open: boolean;
  disabledBtnGuardar?: boolean;
  width?: number | string;
  height?: number | string;
  btnGuardar?: string;
  mostrarBtnCancelar?: boolean;
  mostrarBtnGuardar?: boolean;
  switchFooter?: React.ReactNode;
  tituloJsx?: React.ReactNode;
  subTitulo?: string;
  ocultarIconoX?: boolean;
  borderBottom?: string;
  paddingDialogActions?: string;
}

export interface IUserAuth {
  id: number;
  nombre: string;
  email: string;
  id_restaurante: number;
  rol: number; // id_rol en la BD
  es_propietario: boolean; // viene como TINYINT(1) pero se parsea como boolean
  nombre_restaurante: string;
}

export interface IRol {
  id: number;
  nombre_rol: string;
}

export interface ICrearUsuarioHijo {
  nombre: string;
  email: string;
  password: string;
  id_rol: number; // Ej. 2 = admin, 3 = mesero, etc
}
