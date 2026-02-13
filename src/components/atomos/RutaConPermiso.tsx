import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import {
  permisosSuperUsuario,
  permisosRestaurante,
} from "../../utils/permisosUsuarios";
import { ReactNode } from "react";

export const RutaConPermiso = ({ children }: { children: ReactNode }) => {
  const user = useAuthStore((s) => s.user);
  const permisos = permisosSuperUsuario(user);
  const accesRestaurante = permisosRestaurante(user);

  if (!permisos || !accesRestaurante) {
    return <Navigate to="/reservas" replace />;
  }

  return children;
};
