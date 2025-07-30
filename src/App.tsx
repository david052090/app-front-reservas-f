import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReservasPage from "./page/Reservas";
import PersistentDrawer from "./components/moleculas/menuDrawer/PersistentDrawer";
import { LoginUsuario } from "./components/moleculas/usuarios/LoginUsuario";
//import RegistroUsuario from "./components/moleculas/usuarios/RegistroUsuario";
import { ProtectedRoute } from "./components/atomos/ProtegerRutas.atomos";
import ConfigAmbientes from "./page/ConfigAmbientes";
import ConfigTipoReservas from "./page/ConfigTipoReservas";
import Estadisticas from "./page/Estadisticas";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/**<Route path="/register" element={<RegistroUsuario />} /> */}
      <Route path="/register" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginUsuario />} />
      <Route
        path="/reservas"
        element={
          <ProtectedRoute>
            <PersistentDrawer>
              <ReservasPage />
            </PersistentDrawer>
          </ProtectedRoute>
        }
      />
      <Route
        path="/ambientes"
        element={
          <ProtectedRoute>
            <PersistentDrawer>
              <ConfigAmbientes />
            </PersistentDrawer>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tipos-reservas"
        element={
          <ProtectedRoute>
            <PersistentDrawer>
              <ConfigTipoReservas />
            </PersistentDrawer>
          </ProtectedRoute>
        }
      />
      <Route
        path="/estadisticas"
        element={
          <ProtectedRoute>
            <PersistentDrawer>
              <Estadisticas />
            </PersistentDrawer>
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default App;
