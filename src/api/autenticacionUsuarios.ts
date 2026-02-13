// REGISTRAR USUARIO
import axios from "axios";
import { GESTIONAR_RESERVAS } from "../Env";
import { IRegistroUsuario, ILoginUsuario } from "../interface/general";
import { encriptarDatos } from "../utils/encriptarLogin";
import { axiosInstance } from "./axiosInstance";

// ----------------------------------------------------------
// REGISTRAR USUARIO
// ----------------------------------------------------------
export async function registrarUsuario({
  nombre,
  nombre_restaurante,
  nit,
  email,
  password,
}: IRegistroUsuario) {
  const url = `${GESTIONAR_RESERVAS}/register`;

  const payloadEncriptado = encriptarDatos({
    nombre,
    nombre_restaurante,
    nit,
    email,
    password,
  });

  return axios
    .post(
      url,
      { payload: payloadEncriptado },
      { withCredentials: false } // no necesita cookies
    )
    .then(({ data }) => data)
    .catch((err) => {
      console.error("Error al registrar usuario:", err);
      throw err;
    });
}

// ----------------------------------------------------------
// LOGIN USUARIO
// ----------------------------------------------------------
export async function loginUsuario({ email, password }: ILoginUsuario) {
  const payload = encriptarDatos({ email, password });

  // 🔥 Debe usar axios normal porque aún NO existe cookie
  return axiosInstance.post("/login", { payload });
}

// ----------------------------------------------------------
// OBTENER USUARIO ACTUAL (usa refresh automático por interceptor)
// ----------------------------------------------------------
export async function obtenerUsuarioActual() {
  const { data } = await axiosInstance.get("/recargarDatos");
  return data.user;
}

// ----------------------------------------------------------
// LOGOUT
// ----------------------------------------------------------
export async function logoutUsuario() {
  return axiosInstance.post("/logout");
}

// ----------------------------------------------------------
// REFRESH TOKEN (usado por interceptor)
// ----------------------------------------------------------
export async function refreshToken() {
  try {
    await axiosInstance.post("/refresh");

    // 🔥 Necesario para que el navegador aplique la cookie nueva
    await new Promise((res) => setTimeout(res, 50));

    return true;
  } catch {
    return false;
  }
}
