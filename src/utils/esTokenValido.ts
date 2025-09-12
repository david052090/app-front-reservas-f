import { jwtDecode } from "jwt-decode";
import { NavigateFunction, Location } from "react-router-dom";
import { AppDispatch } from "../store/store";
import { logout, setAuthFromStorage } from "../store/authSlice";

export const esTokenValido = (token: string | null): boolean => {
  if (!token) return false;
  try {
    const decoded: any = (jwtDecode as any).default
      ? (jwtDecode as any).default(token)
      : (jwtDecode as any)(token);
    return decoded.exp && decoded.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

export const handleStorageAuth =
  (dispatch: AppDispatch, navigate: NavigateFunction, location: Location) =>
  (e: StorageEvent) => {
    if (e.key === "authToken") {
      const newVal = e.newValue;
      if (!newVal || !esTokenValido(newVal)) {
        // token borrado o inválido -> logout
        dispatch(logout());
        if (location.pathname !== "/login") {
          navigate("/login", { replace: true });
        }
      } else {
        // token válido -> hidratar en Redux
        dispatch(setAuthFromStorage(newVal));
      }
    }
  };

export const handleVisibilityAuth =
  (dispatch: AppDispatch, navigate: NavigateFunction, location: Location) =>
  () => {
    if (document.visibilityState === "visible") {
      const stored = localStorage.getItem("authToken");
      if (!stored || !esTokenValido(stored)) {
        dispatch(logout());
        if (location.pathname !== "/login") {
          navigate("/login", { replace: true });
        }
      }
    }
  };
