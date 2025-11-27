import TablaEncabezado from "./TablaEncabezado.moleculas";
import { ENCABEZADO_TABLA_RESERVAS } from "../../constants/global.constants";
import {
  IListadoReservas,
  IDataReservas,
} from "../../interface/reservas.interface";
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
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";
const TablaReservas = ({
  dataListadoReservas,
  cargando,
  setAbrirModalEditar,
  setReservaEditar,
  setDetalleReserva,
  setAbrirModalDetalleReservas,
  setNombreCliente,
  setAbrirModalEliminarReservas,
  setEliminarReservas,
}: IListadoReservas) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = dataListadoReservas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const mostrarColor = (row: IDataReservas) => {
    const isToday = dayjs(row.fecha).isSame(dayjs(), "day");
    const isFuture = dayjs(row.fecha).isAfter(dayjs(), "day");
    if (isToday && row.estado_reserva === 1) {
      return "green";
    }
    if (isFuture && row.estado_reserva === 1) {
      return "orange";
    }
    if (isToday || (isFuture && row.estado_reserva === 0)) {
      return "red";
    } else {
      return "transparent";
    }
  };

  return (
    <Paper
      sx={{ width: { xs: "250px", md: "100%" }, my: 3, overflowX: "auto" }}
    >
      <TableContainer
        sx={{
          maxHeight: "500px",
          overflowY: dataListadoReservas.length > 7 ? "auto" : "visible",
        }}
      >
        <Table aria-labelledby="tableTitle collapsible table" stickyHeader>
          <TableHead>
            <TableRow>
              <TablaEncabezado encabezado={ENCABEZADO_TABLA_RESERVAS} />
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
                {visibleRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      Sin resultado
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {visibleRows.map((row) => {
                      const estadoColor = mostrarColor(row);
                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={row.id}
                          sx={{ position: "relative" }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            padding="none"
                            align="left"
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: "4px",
                                bgcolor: estadoColor,
                              }}
                            />
                            <Typography
                              sx={{
                                color: "rgba(8, 107, 181, 1)",
                                fontWeight: 700,
                                fontSize: "14px",
                                pl: 2,
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
                            align="center"
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
                            {`${row.numero_mesa}/${row.ubicacion}`}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                          >
                            <Tooltip
                              title={
                                !row.observacion
                                  ? "Sin observación"
                                  : "Click para ver observación"
                              }
                              arrow
                            >
                              <span>
                                <IconButton
                                  size="small"
                                  disabled={!row.observacion}
                                  sx={{ color: "#1976d2" }}
                                  onClick={() => {
                                    setDetalleReserva(row.observacion);
                                    setNombreCliente(row.nombre_cliente);
                                    setAbrirModalDetalleReservas(true);
                                  }}
                                >
                                  <AssignmentOutlinedIcon />
                                </IconButton>
                              </span>
                            </Tooltip>
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              color: row.estado_reserva === 1 ? "green" : "red",
                            }}
                          >
                            {row.estado_reserva === 1
                              ? "Confirmada"
                              : "Cancelada"}
                          </TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: "flex" }}>
                              <IconButton
                                sx={{ color: "#1976d2" }}
                                onClick={() => {
                                  setReservaEditar(row);
                                  setAbrirModalEditar(true);
                                }}
                              >
                                <EditIcon />
                              </IconButton>

                              <IconButton
                                sx={{ color: "#d32f2f" }}
                                onClick={() => {
                                  setEliminarReservas({
                                    id: row.id,
                                    nombreCliente: row.nombre_cliente,
                                  });
                                  setNombreCliente(row.nombre_cliente);
                                  setAbrirModalEliminarReservas(true);
                                }}
                                disabled
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
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
      <Box
        sx={{ border: "1px solid rgb(224, 224, 224, 1)" }}
        display="flex"
        justifyContent="flex-end"
      >
        <TablePagination
          sx={{ color: "#0779cc", fontSize: "400" }}
          rowsPerPageOptions={[50, 100, 200]}
          count={dataListadoReservas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Reservas por página:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count}`
          }
        />
      </Box>
    </Paper>
  );
};
export default TablaReservas;
