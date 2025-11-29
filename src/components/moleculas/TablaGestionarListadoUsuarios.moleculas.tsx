import TablaEncabezado from "./TablaEncabezado.moleculas";
import {
  ENCABEZADO_TABLA_GESTIONAR_AMBIENTES,
  ENCABEZADO_TABLA_GESTIONAR_USUARIOS,
} from "../../constants/global.constants";
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
import { IListadoGestionUsuarios } from "../../interface/usuarios.interface";
import { ROLES_USUARIOS } from "../../constants/global.constants";

const TablaGestionarListadoUsuarios = ({
  dataListadoUsuarios,
  cargando,
  rolesUsuarios,
}: IListadoGestionUsuarios) => {
  console.log("rolesUsuarios", rolesUsuarios);
  return (
    <Paper
      sx={{ width: { xs: "250px", md: "100%" }, my: 3, overflowX: "auto" }}
    >
      <TableContainer
        sx={{
          maxHeight: dataListadoUsuarios.length > 7 ? "550px" : "auto",
          overflowY: dataListadoUsuarios.length > 7 ? "auto" : "visible",
        }}
      >
        <Table aria-labelledby="tableTitle collapsible table" stickyHeader>
          <TableHead>
            <TableRow>
              <TablaEncabezado
                encabezado={ENCABEZADO_TABLA_GESTIONAR_USUARIOS}
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
                {dataListadoUsuarios.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      Sin resultado
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {dataListadoUsuarios.map((row) => {
                      const roles = rolesUsuarios.find(
                        (r) => r.id === row.id_rol
                      );
                      return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell
                            align="left"
                            sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                          >
                            {row.nombre}
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                          >
                            {row.email}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                          >
                            {roles?.nombre_rol ?? "Sin rol"}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                          >
                            {row.es_propietario ? "Sí" : "No"}
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
export default TablaGestionarListadoUsuarios;
