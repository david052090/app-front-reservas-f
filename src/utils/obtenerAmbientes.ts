import { obtenerAmbientes } from "../api/consultarAmbientes";
export const getListaAmbientes = async () => {
  try {
    const respuesta = await obtenerAmbientes();
    return respuesta;
  } catch (error) {
    throw error;
  }
};
