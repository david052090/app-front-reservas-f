import axios from "axios";
import { GESTIONAR_RESERVAS } from "../Env";
import { FormValues } from "../interface/formularios.interface";
import { IConsultarReservas } from "../interface/reservas.interface";
export async function gestionarListadoReservas({
  fecha,
  nombreCliente,
}: IConsultarReservas) {
  const token = localStorage.getItem("authToken");
  const params = new URLSearchParams();
  if (fecha) params.append("fecha", fecha);
  if (nombreCliente) params.append("nombre_cliente", nombreCliente);

  const url = GESTIONAR_RESERVAS + `/reservas?${params.toString()}`;
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => {
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

export async function actualizarReserva(data: FormValues & { id: number }) {
  const token = localStorage.getItem("authToken");

  // Extrae el id para la URL, y el resto del body sin id
  const { id, ...body } = data;

  const url = `${GESTIONAR_RESERVAS}/reservas/${id}`;

  const response = await axios.patch(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
