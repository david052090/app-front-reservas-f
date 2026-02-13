// este encabezado, contiene el titulo, el buscador retraible, el filtro estado y el boton redondo
// este componente se comporta como un encabezado base
import { Box, Typography } from "@mui/material";
import BotonRedondo from "../atomos/BotonRedondo.atomos";
import AddIcon from "@mui/icons-material/Add";
import ReplayIcon from "@mui/icons-material/Replay";
import IconButton from "@mui/material/IconButton";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import { IEncabezadoReservas } from "../../interface/reservas.interface";
import { useAuthStore } from "../../store/useAuthStore";
import { permisosSuperUsuario } from "../../utils/permisosUsuarios";

export default function EncabezadoReservas({
  setAbrirModalReservas,
  actualizarTabla,
  filtro,
  setFiltro,
  filtroFecha,
  setFiltroFecha,
  mostrarBuscador,
  mostrarFecha,
  reservasHoy,
  reservasFuturas,
  mostrarContadores,
  textoBtn,
}: IEncabezadoReservas) {
  const [valorBuscador, setValorBuscador] = useState<string>(filtro ?? "");
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const permisos = permisosSuperUsuario(user);

  const handleClear = () => {
    setValorBuscador("");
    setFiltro?.("");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValorBuscador(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setFiltro?.(valorBuscador.trim());
    }
  };
  return (
    <Box
      sx={{
        width: { xs: "250px", md: "100%" },
        display: "flex",
        flexWrap: "wrap",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent:
          !mostrarBuscador && !mostrarContadores && !mostrarFecha
            ? "flex-end"
            : "space-between",
        alignItems: "center",
        pb: 1,
        gap: { xs: 1, sm: 2 },
      }}
    >
      {mostrarBuscador && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f0f0f0",
            borderRadius: "999px",
            px: 1.5,
            height: 38,
            flex: { xs: 1, sm: "0 0 auto" },
            minWidth: { xs: "100%", sm: 250 },
          }}
        >
          <SearchIcon sx={{ color: "#888", mr: 1 }} />

          <InputBase
            placeholder="Buscar por nombre..."
            value={valorBuscador}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            sx={{ flex: 1, fontSize: 14 }}
          />

          {valorBuscador && (
            <IconButton size="small" onClick={handleClear} sx={{ p: 0.5 }}>
              <ClearIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      )}
      {mostrarContadores && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            order: { xs: 3, sm: 2 },
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Reservas:</Typography>
          <Box
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              borderRadius: "50%",
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: 16,
              cursor: "default",
            }}
          >
            {(reservasHoy ?? 0) + (reservasFuturas ?? 0)}
          </Box>
          <Tooltip title="Reservas confirmadas para hoy" arrow>
            <Box
              sx={{
                backgroundColor: "#4caf50",
                color: "white",
                borderRadius: "4px",
                width: 30,
                height: 12,
                cursor: "default",
              }}
            ></Box>
          </Tooltip>

          <Tooltip title="Reservas próximas confirmadas" arrow>
            <Box
              sx={{
                backgroundColor: "#ff9800",
                color: "white",
                borderRadius: "4px",
                width: 30,
                height: 12,
                cursor: "default",
              }}
            ></Box>
          </Tooltip>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          gap: { xs: 1, sm: 2 },
          order: { xs: 2, sm: 3 },
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "200px",
            alignItems: "center",
          }}
        >
          {mostrarFecha && (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DatePicker
                label="Filtrar por fecha"
                open={openCalendar}
                onOpen={() => setOpenCalendar(true)}
                onClose={() => setOpenCalendar(false)}
                value={filtroFecha}
                onChange={(nuevaFecha) => setFiltroFecha?.(nuevaFecha)}
                slotProps={{
                  textField: {
                    size: "small",
                    sx: {
                      backgroundColor: "#f0f0f0",
                      borderRadius: "10px",
                      width: { xs: "100%", sm: 180 },
                      mr: { xs: 0 },
                    },
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end" sx={{ gap: 1 }}>
                          {/* Ícono nativo del Calendario */}
                          <IconButton
                            edge="end"
                            tabIndex={-1}
                            onClick={() => setOpenCalendar(true)}
                          >
                            <CalendarIcon fontSize="small" />
                          </IconButton>

                          {/* Ícono personalizado para limpiar la fecha */}
                          {filtroFecha && (
                            <IconButton
                              size="small"
                              edge="end"
                              onClick={() => setFiltroFecha?.(null)}
                            >
                              <ClearIcon fontSize="small" />
                            </IconButton>
                          )}
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </LocalizationProvider>
          )}
        </Box>
        <IconButton
          onClick={actualizarTabla}
          sx={{
            backgroundColor: "#f0f0f0",
            display: { xs: "none", sm: "inline-flex" },
            mr: { xs: 0, sm: "25px" },
          }}
        >
          <ReplayIcon />
        </IconButton>
        <BotonRedondo
          texto={textoBtn ?? "Nueva"}
          icono={<AddIcon />}
          width={{ xs: "100%", sm: "auto" }}
          onClick={() => setAbrirModalReservas(true)}
          disabled={!permisos}
        />
      </Box>
    </Box>
  );
}
