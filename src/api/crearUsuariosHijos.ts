import { axiosInstance } from "./axiosInstance";
import { encriptarDatos } from "../utils/encriptarLogin";
import { ICrearUsuarioHijo, IRol } from "../interface/general";
import { IListaUsuarios } from "../interface/usuarios.interface";

// 📌 Crear usuario hijo
export async function crearUsuarioHijoApi(data: ICrearUsuarioHijo) {
  const payload = encriptarDatos(data);

  const { data: response } = await axiosInstance.post("/usuarios-hijos", {
    payload,
  });

  return response;
}

// 📌 Obtener roles disponibles para hijos
export async function obtenerRolesHijoApi(): Promise<IRol[]> {
  const { data } = await axiosInstance.get("/usuarios-hijos/roles");

  return data.roles;
}

// 📌 Listar usuarios hijos
export async function listarUsuariosHijos(): Promise<IListaUsuarios[]> {
  const { data } = await axiosInstance.get("/usuarios-hijos");

  return data;
}
