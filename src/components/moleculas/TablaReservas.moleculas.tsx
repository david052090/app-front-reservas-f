import TablaEncabezado from "./TablaEncabezado.moleculas";
import { ENCABEZADO_TABLA_RESERVAS } from "../../constants/global.constants";
import { IListadoReservas } from "../../interface/reservas.interface";
import formatearFecha from "../../utils/formatearFecha";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

const TablaReservas = ({ dataListadoReservas }: IListadoReservas) => {
  return (
    <Paper sx={{ width: "1000px", my: 3, overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "700px" }}>
        <Table aria-labelledby="tableTitle collapsible table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TablaEncabezado encabezado={ENCABEZADO_TABLA_RESERVAS} />
            </TableRow>
          </TableHead>

          <TableBody>
            {dataListadoReservas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Sin resultado
                </TableCell>
              </TableRow>
            ) : (
              <>
                {dataListadoReservas.map((row) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" onClick={() => {}} />
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="left"
                      >
                        <Typography
                          sx={{
                            color: "rgba(8, 107, 181, 1)",
                            fontWeight: 700,
                            fontSize: "14px",
                            width: "180px",
                            paddingLeft: "16px",
                          }}
                        >
                          {row.nombre_cliente}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                      >
                        {row.celular}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                      >
                        {row.cantidad_personas}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                      >
                        {row.tipo_reserva}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                      >
                        {formatearFecha(row.fecha, false)}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                      >
                        {row.hora}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                      >
                        {row.numero_mesa}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color:
                            row.estado_reserva === "Confirmada"
                              ? "green"
                              : "red",
                        }}
                      >
                        {row.estado_reserva}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{ border: "1px solid rgb(224, 224, 224, 1)" }}
        display="flex"
        justifyContent="flex-end"
      >
        <TablePagination
          sx={{ color: "#0779cc", fontSize: "400" }}
          rowsPerPageOptions={[10, 30, 50, 100, 200]}
          count={dataListadoReservas.length}
          rowsPerPage={0}
          page={0}
          onPageChange={() => {}}
          labelRowsPerPage="Reservas por página:"
          onRowsPerPageChange={() => {}}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count}`
          }
        />
      </Box>
    </Paper>
  );
};
export default TablaReservas;
