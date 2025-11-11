// REGISTRAR USUARIO
import axios from "axios";
import { GESTIONAR_RESERVAS } from "../Env";
import { IRegistroUsuario, ILoginUsuario } from "../interface/general";
import { encriptarDatos } from "../utils/encriptarLogin";

export async function registrarUsuario({
  nombre,
  nombre_restaurante,
  nit,
  email,
  password,
}: IRegistroUsuario) {
  const url = GESTIONAR_RESERVAS + `/register`;

  const payloadEncriptado = encriptarDatos({
    nombre,
    nombre_restaurante,
    nit,
    email,
    password,
  });

  return axios
    .post(url, {
      payload: payloadEncriptado,
    })
    .then(({ data }) => data)
    .catch((err) => {
      console.error("Error al registrar usuario:", err);
      throw err;
    });
}

// LOGIN USUARIO
export async function loginUsuario({ nombre, password }: ILoginUsuario) {
  const url = GESTIONAR_RESERVAS + `/login`;
  const payloadEncriptado = encriptarDatos({ nombre, password });
  return axios
    .post(url, {
      payload: payloadEncriptado,
    })
    .then(({ data }) => {
      // Guardar token en localStorage
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }
      return data;
    })
    .catch((err) => {
      console.error("Error al iniciar sesión:", err);
      throw err;
    });
}
