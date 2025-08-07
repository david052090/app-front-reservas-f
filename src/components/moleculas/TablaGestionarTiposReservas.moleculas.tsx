import TablaEncabezado from "./TablaEncabezado.moleculas";
import { ENCABEZADO_TABLA_GESTIONAR_TIPOS_RESERVAS } from "../../constants/global.constants";
import formatearFecha from "../../utils/formatearFecha";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { IListadoGestionTiposReservas } from "../../interface/tiposReservas.interface";

const TablaGestionarTiposReservas = ({
  dataListadoTiposReservas,
  cargando,
}: IListadoGestionTiposReservas) => {
  return (
    <Paper
      sx={{ width: { xs: "250px", md: "100%" }, my: 3, overflowX: "auto" }}
    >
      <TableContainer
        sx={{
          maxHeight: dataListadoTiposReservas.length > 7 ? "550px" : "auto",
          overflowY: dataListadoTiposReservas.length > 7 ? "auto" : "visible",
        }}
      >
        <Table aria-labelledby="tableTitle collapsible table" stickyHeader>
          <TableHead>
            <TableRow>
              <TablaEncabezado
                encabezado={ENCABEZADO_TABLA_GESTIONAR_TIPOS_RESERVAS}
              />
            </TableRow>
          </TableHead>

          <TableBody>
            {cargando ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {dataListadoTiposReservas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      Sin resultado
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {dataListadoTiposReservas.map((row) => {
                      return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell
                            align="left"
                            sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                          >
                            {row.nombre_tipo_reserva}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                          >
                            {formatearFecha(row.created_at, false)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export default TablaGestionarTiposReservas;
