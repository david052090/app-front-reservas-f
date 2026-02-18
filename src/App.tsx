import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ReservasPage from "./page/Reservas";
import PersistentDrawer from "./components/moleculas/menuDrawer/PersistentDrawer";
import { LoginUsuario } from "./components/moleculas/usuarios/LoginUsuario";
import ConfigAmbientes from "./page/ConfigAmbientes";
import ConfigTipoReservas from "./page/ConfigTipoReservas";
import Estadisticas from "./page/Estadisticas";
import MesasPage from "./page/Mesas";

import { ProtegerRutas } from "./components/atomos/ProtegerRutas.atomos";
import { LoggedOutOnlyRoute } from "./components/atomos/LoggedOutOnlyRoute";
import RegistroUsuario from "./components/moleculas/usuarios/RegistroUsuario";
import ConfigUsuariosHijos from "./page/ConfigUsuariosHijos";
import { RutaConPermiso } from "./components/atomos/RutaConPermiso";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          path="/login"
          element={
            <LoggedOutOnlyRoute>
              <LoginUsuario />
            </LoggedOutOnlyRoute>
          }
        />

        <Route
          path="/register"
          element={
            <LoggedOutOnlyRoute>
              <RegistroUsuario />
            </LoggedOutOnlyRoute>
          }
        />

        <Route
          path="/reservas"
          element={
            <ProtegerRutas>
              <PersistentDrawer>
                <ReservasPage />
              </PersistentDrawer>
            </ProtegerRutas>
          }
        />

        <Route
          path="/ambientes"
          element={
            <ProtegerRutas>
              <PersistentDrawer>
                <ConfigAmbientes />
              </PersistentDrawer>
            </ProtegerRutas>
          }
        />

        <Route
          path="/tipos-reservas"
          element={
            <ProtegerRutas>
              <PersistentDrawer>
                <ConfigTipoReservas />
              </PersistentDrawer>
            </ProtegerRutas>
          }
        />

        <Route
          path="/estadisticas"
          element={
            <ProtegerRutas>
              <PersistentDrawer>
                <Estadisticas />
              </PersistentDrawer>
            </ProtegerRutas>
          }
        />
        <Route
          path="/mesas"
          element={
            <ProtegerRutas>
              <PersistentDrawer>
                <MesasPage />
              </PersistentDrawer>
            </ProtegerRutas>
          }
        />
        <Route
          path={"/usuarios"}
          element={
            <ProtegerRutas>
              <RutaConPermiso>
                <PersistentDrawer>
                  <ConfigUsuariosHijos />
                </PersistentDrawer>
              </RutaConPermiso>
            </ProtegerRutas>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
