// Componente que construye y retorna el encabesado de una tabla, recibe un array con la data a retornar
import { TableCell, TableSortLabel } from "@mui/material";
import { IEncabezadoDataTablaOrdenar } from "../../interface/general.ts";

const TablaEncabezado = ({
  encabezado,
  order,
  orderBy,
  manejadorOrdenamiento,
}: IEncabezadoDataTablaOrdenar) => {
  return (
    <>
      {encabezado.map((headCell) => {
        return (
          <TableCell
            key={headCell.id}
            align={headCell.align ?? "left"}
            sx={{
              maxWidth: headCell.maxWidth ?? "auto",
              minWidth: headCell.minWidth ?? "auto",
              width: headCell.width ?? "auto",
              padding: headCell.padding ?? "auto",
              paddingLeft: headCell.paddingLeft ?? "auto",
              fontWeight: headCell.fontWeight ?? 700,
              border: headCell.border ?? "",
            }}
          >
            {headCell.iconoOrdenar ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={() => {
                  if (headCell.bloquearConsulta) return;
                  manejadorOrdenamiento && manejadorOrdenamiento(headCell.id);
                }}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        );
      })}
    </>
  );
};

export default TablaEncabezado;
