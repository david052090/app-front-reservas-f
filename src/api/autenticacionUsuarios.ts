// REGISTRAR USUARIO
import axios from "axios";
import { GESTIONAR_RESERVAS } from "../Env";
import { IRegistroUsuario, ILoginUsuario } from "../interface/general";
import { encriptarDatos } from "../utils/encriptarLogin";

// REGISTRAR USUARIO
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
      { withCredentials: false } // ⬅️ CORREGIDO
    )
    .then(({ data }) => data)
    .catch((err) => {
      console.error("Error al registrar usuario:", err);
      throw err;
    });
}

// LOGIN USUARIO
export async function loginUsuario({ email, password }: ILoginUsuario) {
  const url = `${GESTIONAR_RESERVAS}/login`;
  const payloadEncriptado = encriptarDatos({ email, password });

  return axios
    .post(
      url,
      { payload: payloadEncriptado },
      {
        withCredentials: true, // 🔥 Envía y recibe la cookie httpOnly
      }
    )
    .then(({ data }) => data) // { user: {...} }
    .catch((err) => {
      console.error("Error al iniciar sesión:", err);
      throw err;
    });
}

export async function obtenerUsuarioActual() {
  const { data } = await axios.get(`${GESTIONAR_RESERVAS}/recargarDatos`, {
    withCredentials: true,
  });
  return data.user;
}

export async function logoutUsuario() {
  return axios.post(
    `${GESTIONAR_RESERVAS}/logout`,
    {},
    {
      withCredentials: true,
    }
  );
}
