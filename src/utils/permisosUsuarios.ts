import { IUserAuth } from "../interface/general";
import { ROLES_USUARIOS } from "../constants/global.constants";

export const permisosSuperUsuario = (user: IUserAuth | null) => {
  if (!user) return false;

  return (
    user.es_propietario === ROLES_USUARIOS.propietario ||
    user.id_rol === ROLES_USUARIOS.propietario ||
    user.id_rol === ROLES_USUARIOS.admin
  );
};

export const permisosRestaurante = (user: IUserAuth | null) => {
  if (!user) return false;

  return (
    user.es_propietario === ROLES_USUARIOS.propietario ||
    user.id_rol === ROLES_USUARIOS.propietario
  );
};
