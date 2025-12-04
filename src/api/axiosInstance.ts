// src/api/axiosInstance.ts
import axios from "axios";
import { GESTIONAR_RESERVAS } from "../Env";
import { useAuthStore } from "../store/useAuthStore";

export const axiosInstance = axios.create({
  baseURL: GESTIONAR_RESERVAS,
  withCredentials: true, // necesario para cookies httpOnly
});

// Control de refresh para evitar loops
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as any;

    // Si no hay respuesta (error de red, etc.)
    if (!error.response) {
      return Promise.reject(error);
    }

    const status = error.response.status;

    // Si NO es 401 → dejar que el error pase normal
    if (status !== 401) {
      return Promise.reject(error);
    }

    /**const url: string = originalRequest?.url || "";

    if (
      url.includes("/login") ||
      url.includes("/register") ||
      url.includes("/refresh")
    ) {
      return Promise.reject(error);
    } */

    // Evitar reintentos infinitos
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // Si NO hay refresh en proceso → lanzarlo ahora
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        // ⛔️ OJO: usamos axios "plano", NO axiosInstance
        await axios.post(
          `${GESTIONAR_RESERVAS}/refresh`,
          {},
          { withCredentials: true }
        );

        // pequeño delay para que el navegador procese la nueva cookie
        await new Promise((res) => setTimeout(res, 50));

        processQueue(null, null);
        isRefreshing = false;

        // reintentar la petición original con el nuevo token
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;

        // si falla el refresh → cerrar sesión global
        useAuthStore.getState().clearUser();

        return Promise.reject(err);
      }
    }

    // Si YA hay un refresh en curso → encolamos esta petición
    return new Promise((resolve, reject) => {
      failedQueue.push({
        resolve: () => resolve(axiosInstance(originalRequest)),
        reject,
      });
    });
  }
);
