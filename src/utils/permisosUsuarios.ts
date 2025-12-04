import { IUserAuth } from "../interface/general";

export const permisosSuperUsuario = (user: IUserAuth | null) => {
  if (!user) return false;

  return user.es_propietario || user.rol === 1;
};
