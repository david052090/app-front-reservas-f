import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import SnackbarAtom from "./components/atomos/snackbar.atomos";
import axios from "axios";
axios.defaults.withCredentials = true;
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SnackbarAtom>
      <App />
    </SnackbarAtom>
  </React.StrictMode>
);
