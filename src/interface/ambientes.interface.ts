export interface IListaAmbientes {
  id: number;
  nombre_ambiente: string;
  created_at: string;
}

export interface IListadoGestionAmbientes {
  dataListadoAmbientes: IListaAmbientes[];
  cargando: boolean;
}
