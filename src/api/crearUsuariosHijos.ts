import axios from "axios";
import { GESTIONAR_RESERVAS } from "../Env";
import { encriptarDatos } from "../utils/encriptarLogin";
import { ICrearUsuarioHijo, IRol } from "../interface/general";
import { IListaUsuarios } from "../interface/usuarios.interface";

export async function crearUsuarioHijoApi(data: ICrearUsuarioHijo) {
  const url = `${GESTIONAR_RESERVAS}/usuarios-hijos`;

  const payload = encriptarDatos(data);

  const response = await axios.post(
    url,
    { payload },
    { withCredentials: true } // 🔥 envía cookie httpOnly
  );

  return response.data;
}

export async function obtenerRolesHijoApi(): Promise<IRol[]> {
  const { data } = await axios.get(
    `${GESTIONAR_RESERVAS}/usuarios-hijos/roles`,
    { withCredentials: true }
  );

  return data.roles;
}

export async function listarUsuariosHijos(): Promise<IListaUsuarios[]> {
  const { data } = await axios.get(`${GESTIONAR_RESERVAS}/usuarios-hijos`, {
    withCredentials: true,
  });

  return data;
}
