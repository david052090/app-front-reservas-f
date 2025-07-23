import TablaEncabezado from "./TablaEncabezado.moleculas";
import { ENCABEZADO_TABLA_GESTIONAR_AMBIENTES } from "../../constants/global.constants";
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
import dayjs from "dayjs";

const TablaGestionarRegistroAmbientes = ({
  dataListadoReservas,
  cargando,
  setAbrirModalEditar,
  setReservaEditar,
  setSelected,
  selected,
  setSelectedData,
  selectedData,
}: IListadoGestionAmbientes) => {
  return (
    <Paper sx={{ width: "910px", my: 3, overflow: "hidden" }}>
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
                      onClick={() => {}}
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
                <Checkbox color="primary" />
              </TableCell>
              <TablaEncabezado
                encabezado={ENCABEZADO_TABLA_GESTIONAR_AMBIENTES}
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
                {dataListadoReservas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      Sin resultado
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {dataListadoReservas.map((row) => {
                      return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell padding="checkbox">
                            <Checkbox color="primary" />
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
          onRowsPerPageChange={() => {}}
          labelRowsPerPage="Reservas por página:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count}`
          }
        />
      </Box>
    </Paper>
  );
};
export default TablaGestionarRegistroAmbientes;
