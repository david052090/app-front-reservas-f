import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import SnackbarAtom from "./components/atomos/snackbar.atomos";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackbarAtom>
      <App />
    </SnackbarAtom>
  </StrictMode>
);
