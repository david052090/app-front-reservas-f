export interface IListaAmbientes {
  id: number;
  nombre_ambiente: string;
  created_at: string;
}

export interface IListadoGestionAmbientes {
  dataListadoAmbientes: IListaAmbientes[];
  cargando: boolean;
  setAbrirModalEditar: React.Dispatch<React.SetStateAction<boolean>>;
  setReservaEditar: React.Dispatch<
    React.SetStateAction<IListaAmbientes | null>
  >;
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  selected: number[];
  setSelectedData: React.Dispatch<React.SetStateAction<IListaAmbientes[]>>;
  selectedData: IListaAmbientes[];
}
