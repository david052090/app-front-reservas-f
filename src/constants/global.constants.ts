import { ITablaEncabezado } from "../interface/general";
export const ENCABEZADO_TABLA_RESERVAS: Array<ITablaEncabezado> = [
  {
    id: "nombre_cliente",
    label: "Nombre",
    align: "left",
    width: "5%",
    paddingLeft: "25px",
    iconoOrdenar: true,
  },
  {
    id: "celular",
    label: "Celular",
    align: "right",
    width: "5%",
    iconoOrdenar: true,
  },
  {
    id: "cantidad_personas",
    label: "Personas",
    align: "right",
    width: "10%",
    iconoOrdenar: true,
    bloquearConsulta: true,
  },
  {
    id: "tipo_reserva",
    label: "Reserva",
    align: "right",
    width: "10%",
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
    label: "Mesa/Ub",
    align: "center",
    width: "10%",
  },
  {
    id: "observacion",
    label: "Obser",
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
export const ENCABEZADO_TABLA_GESTIONAR_AMBIENTES: Array<ITablaEncabezado> = [
  {
    id: "id_ambiente",
    label: "Id",
    align: "left",
    width: "25%",
    paddingLeft: "25px",
    iconoOrdenar: true,
  },
  {
    id: "nombre",
    label: "Nombre",
    align: "right",
    width: "35%",
    iconoOrdenar: true,
  },
  {
    id: "fecha_registro",
    label: "Fecha registro",
    align: "right",
    width: "35%",
    iconoOrdenar: true,
  },
];
export const UBICACIONES = [
  { value: "primer piso", label: "Primer piso" },
  { value: "segundo piso", label: "Segundo piso" },
  { value: "terraza", label: "Terraza" },
];
