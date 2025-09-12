import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { store } from "./store/store";
import App from "./App.tsx";
import SnackbarAtom from "./components/atomos/snackbar.atomos";
import { Provider } from "react-redux";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackbarAtom>
      <Provider store={store}>
        <App />
      </Provider>
    </SnackbarAtom>
  </StrictMode>
);
