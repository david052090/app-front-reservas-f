import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { permisosSuperUsuario } from "../../utils/permisosUsuarios";

export const RutaConPermiso = ({ children }: { children: JSX.Element }) => {
  const user = useAuthStore((s) => s.user);
  const permisos = permisosSuperUsuario(user);

  if (!permisos) {
    return <Navigate to="/reservas" replace />;
  }

  return children;
};
