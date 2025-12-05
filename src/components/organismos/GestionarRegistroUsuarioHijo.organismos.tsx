import EncabezadoReservas from "../moleculas/EncabezadoReservas.moleculas";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ModalCrearUsuarioHijo from "../moleculas/usuarios/CrearUsuariosHijos";
import { IListaUsuarios } from "../../interface/usuarios.interface";
import { listarUsuariosHijos } from "../../api/crearUsuariosHijos.ts";
import TablaGestionarListadoUsuarios from "../moleculas/TablaGestionarListadoUsuarios.moleculas";
import { obtenerRolesHijoApi } from "../../api/crearUsuariosHijos.ts";
import { IRol } from "../../interface/general";
import Typography from "@mui/material/Typography";
const GestionarRegistroUsuarioHijo = () => {
  const [abrirModalUsuarioHijo, setAbrirModalUsuarioHijo] =
    useState<boolean>(false);
  const [cargando, setCargando] = useState<boolean>(false);
  const [listarUsuarios, setListarUsuarios] = useState<IListaUsuarios[]>([]);
  const [roles, setRoles] = useState<IRol[]>([]);
  useEffect(() => {
    listarGestionUsuarios();
    obtenerRolesUsuarios();
  }, []);

  const listarGestionUsuarios = async () => {
    try {
      setCargando(true);
      const respuesta = await listarUsuariosHijos();
      setListarUsuarios(respuesta);
      console.log("respuesta", respuesta);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  const obtenerRolesUsuarios = async () => {
    try {
      const data = await obtenerRolesHijoApi();
      setRoles(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box
        sx={{
          width: { xs: "auto", md: "800px" },
          maxWidth: { xs: "100vw", md: "none" },
          mx: 0,
          px: 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "33%" }}>
            <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
              Gestión de Usuarios
            </Typography>
          </Box>
          <EncabezadoReservas
            textoBtn={"crear"}
            setAbrirModalReservas={setAbrirModalUsuarioHijo}
            actualizarTabla={() => listarGestionUsuarios()}
          />
        </Box>
        <TablaGestionarListadoUsuarios
          dataListadoUsuarios={listarUsuarios}
          cargando={cargando}
          rolesUsuarios={roles}
        />
      </Box>

      <ModalCrearUsuarioHijo
        abrirModalUsuarioHijo={abrirModalUsuarioHijo}
        setAbrirModalUsuarioHijo={setAbrirModalUsuarioHijo}
        recargarDataUsuarios={() => listarGestionUsuarios()}
      />
    </>
  );
};
export default GestionarRegistroUsuarioHijo;
