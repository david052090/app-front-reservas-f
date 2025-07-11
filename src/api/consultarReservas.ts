import axios from "axios";
import { GESTIONAR_RESERVAS } from "../Env";
import { FormValues } from "../interface/formularios.interface";
export async function gestionarListadoReservas(userId: string) {
  const url = GESTIONAR_RESERVAS + `/reservas/${userId}`;
  return axios.get(url).then(({ data }) => {
    return data;
  });
}

export async function dataRegistrarReserva(
  dataReserva: Omit<FormValues, "userId">
) {
  const url = GESTIONAR_RESERVAS + `/reservas`;
  const token = localStorage.getItem("authToken");
  return axios
    .post(url, dataReserva, { headers: { Authorization: `Bearer ${token}` } })
    .then(({ data }) => {
      return data;
    });
}
