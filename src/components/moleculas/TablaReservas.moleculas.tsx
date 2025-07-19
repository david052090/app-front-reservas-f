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
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const TablaReservas = ({
  dataListadoReservas,
  cargando,
  setAbrirModalEditar,
  setReservaEditar,
  setSelected,
  selected,
  setSelectedData,
  selectedData,
}: IListadoReservas) => {
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIds = dataListadoReservas.map((r) => r.id);
      setSelected(allIds);
      setSelectedData(dataListadoReservas);
    } else {
      setSelected([]);
      setSelectedData([]);
    }
  };

  const handleClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
    row: (typeof dataListadoReservas)[0]
  ) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [...selected];
    let newSelectedData = [...selectedData];

    if (selectedIndex === -1) {
      newSelected.push(id);
      newSelectedData.push(row);
    } else {
      newSelected.splice(selectedIndex, 1);
      newSelectedData = newSelectedData.filter((item) => item.id !== id);
    }

    setSelected(newSelected);
    setSelectedData(newSelectedData);
  };

  const allSelected =
    dataListadoReservas.length > 0 &&
    selected.length === dataListadoReservas.length;
  const isIndeterminate = selected.length > 0 && !allSelected;
  return (
    <Paper sx={{ width: "1050px", my: 3, overflow: "hidden" }}>
      <TableContainer
        sx={{
          maxHeight: dataListadoReservas.length > 7 ? "550px" : "auto",
          overflowY: dataListadoReservas.length > 7 ? "auto" : "visible",
        }}
      >
        <Table aria-labelledby="tableTitle collapsible table" stickyHeader>
          {selected.length > 0 && (
            <TableHead>
              <TableRow>
                <TableCell colSpan={10} align="left">
                  {selected.length === 1 && (
                    <EditIcon
                      sx={{ cursor: "pointer", color: "#1976d2" }}
                      onClick={() => {
                        setReservaEditar(selectedData[0]);
                        setAbrirModalEditar(true);
                        console.log("Click");
                      }}
                    />
                  )}
                  {selected.length > 0 && (
                    <DeleteIcon
                      sx={{ cursor: "pointer", color: "#1976d2" }}
                      onClick={() => {
                        // Acción al hacer clic en el icono de editar
                        console.log("Editar múltiples:", selectedData);
                      }}
                    />
                  )}
                </TableCell>
              </TableRow>
            </TableHead>
          )}
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={isIndeterminate}
                  checked={allSelected}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
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
                            <Checkbox
                              color="primary"
                              checked={selected.includes(row.id)}
                              onChange={(e) => handleClick(e, row.id, row)}
                            />
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
                            {`${row.numero_mesa}/${row.ubicacion}`}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                          >
                            <Tooltip
                              title={row.observacion || "Sin observación"}
                              arrow
                              componentsProps={{
                                tooltip: {
                                  sx: {
                                    maxWidth: 250, // ancho fijo del tooltip
                                    whiteSpace: "pre-wrap", // permite saltos de línea y wrap
                                    wordBreak: "break-word", // divide palabras largas
                                  },
                                },
                              }}
                            >
                              <span>
                                <IconButton
                                  size="small"
                                  disabled={!row.observacion}
                                  sx={{ color: "#1976d2" }}
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
