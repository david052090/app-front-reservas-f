import { ITablaEncabezado } from "../interface/general";
export const ENCABEZADO_TABLA_RESERVAS: Array<ITablaEncabezado> = [
  {
    id: "nombre_cliente",
    label: "Nombre",
    align: "left",
    width: "125px",
    paddingLeft: "25px",
    iconoOrdenar: true,
  },
  {
    id: "celular",
    label: "Celular",
    align: "right",
    width: "100px",
    iconoOrdenar: true,
  },
  {
    id: "cantidad_personas",
    label: "Personas",
    align: "right",
    width: "100px",
    iconoOrdenar: true,
    bloquearConsulta: true,
  },
  {
    id: "tipo_reserva",
    label: "Reserva",
    align: "right",
    width: "100px",
    iconoOrdenar: true,
    bloquearConsulta: true,
  },
  {
    id: "fecha",
    label: "Fecha",
    align: "center",
    width: "100px",
  },
  {
    id: "hora",
    label: "Hora",
    align: "center",
    width: "100px",
  },
  {
    id: "numero_mesa",
    label: "Mesa/Ub",
    align: "center",
    width: "100px",
  },
  {
    id: "observacion",
    label: "Obser",
    align: "center",
    width: "100px",
  },
  {
    id: "estado_reserva",
    label: "Estado",
    align: "center",
    width: "100px",
  },
  {
    id: "acciones",
    label: "Acciones",
    align: "center",
    width: "100px",
  },
];
export const ENCABEZADO_TABLA_GESTIONAR_AMBIENTES: Array<ITablaEncabezado> = [
  {
    id: "nombre_ambiente",
    label: "Nombre ambiente",
    align: "left",
    width: "50%",
    iconoOrdenar: true,
  },
  {
    id: "fecha_registro",
    label: "Fecha registro",
    align: "right",
    width: "50%",
    iconoOrdenar: true,
  },
];
export const ENCABEZADO_TABLA_GESTIONAR_TIPOS_RESERVAS: Array<ITablaEncabezado> =
  [
    {
      id: "nombre_tipo",
      label: "Nombre Tipo Reserva",
      align: "left",
      width: "50%",
      iconoOrdenar: true,
    },
    {
      id: "fecha_registro",
      label: "Fecha registro",
      align: "right",
      width: "50%",
      iconoOrdenar: true,
    },
  ];
export const UBICACIONES = [
  { value: "primer piso", label: "Primer piso" },
  { value: "segundo piso", label: "Segundo piso" },
  { value: "terraza", label: "Terraza" },
];
