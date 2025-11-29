import { IRol } from "./general";
export interface IListaUsuarios {
  id: number;
  nombre: string;
  id_rol: number;
  es_propietario: string;
  created_at: string;
}

export interface IListadoGestionUsuarios {
  dataListadoUsuarios: IListaUsuarios[];
  cargando: boolean;
  rolesUsuarios: IRol[];
}
