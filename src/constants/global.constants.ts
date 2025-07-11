import { ITablaEncabezado } from "../interface/general";
export const ENCABEZADO_TABLA_RESERVAS: Array<ITablaEncabezado> = [
  {
    id: "nombre_cliente",
    label: "Nombre",
    align: "left",
    width: "10%",
    paddingLeft: "25px",
    iconoOrdenar: true,
  },
  {
    id: "celular",
    label: "Celular",
    align: "right",
    width: "10%",
    iconoOrdenar: true,
  },
  {
    id: "cantidad_personas",
    label: "Personas",
    align: "right",
    width: "15%",
    iconoOrdenar: true,
    bloquearConsulta: true,
  },
  {
    id: "tipo_reserva",
    label: "T. reserva",
    align: "right",
    width: "15%",
    iconoOrdenar: true,
    bloquearConsulta: true,
  },
  {
    id: "fecha",
    label: "Fecha",
    align: "center",
    width: "10%",
  },
  {
    id: "hora",
    label: "Hora",
    align: "center",
    width: "10%",
  },
  {
    id: "numero_mesa",
    label: "Mesa",
    align: "center",
    width: "10%",
  },
  {
    id: "estado_reserva",
    label: "Estado",
    align: "center",
    width: "10%",
  },
];
