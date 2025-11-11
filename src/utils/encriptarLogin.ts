import CryptoJS from "crypto-js";
import { SECRET_KEY } from "../Env";

export const encriptarDatos = (data: object) => {
  const textoPlano = JSON.stringify(data);
  return CryptoJS.AES.encrypt(textoPlano, SECRET_KEY).toString();
};
