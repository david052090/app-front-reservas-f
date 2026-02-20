import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import BentoOutlinedIcon from "@mui/icons-material/BentoOutlined";
import BarChartIcon from "@mui/icons-material/BarChart";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import { logoutUsuario } from "../../../api/autenticacionUsuarios.ts"; // ← ZUSTAND
import { permisosRestaurante } from "../../../utils/permisosUsuarios";

const drawerWidth = 240;

/* --------------------------- Styled Components --------------------------- */

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "isMobile",
})<{ open?: boolean; isMobile: boolean }>(({ theme, open, isMobile }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: isMobile ? 0 : `-${drawerWidth}px`,
  ...(open &&
    !isMobile && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      paddingTop: 10,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  isMobile: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "isMobile",
})<AppBarProps>(({ theme, open, isMobile }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open &&
    !isMobile && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

/* --------------------------- Componente Principal --------------------------- */

export default function PersistentDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const navigate = useNavigate();
  /* --------------------------- Estado del Drawer --------------------------- */
  const [open, setOpen] = React.useState(!isMobile);

  React.useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  /* --------------------------- Zustand: Usuario --------------------------- */
  const user = useAuthStore((s) => s.user);
  const accesosRestaurante = permisosRestaurante(user);
  const clearUser = useAuthStore((s) => s.clearUser);

  /* --------------------------- Acciones --------------------------- */
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleLogout = async () => {
    clearUser(); // limpiamos Zustand

    try {
      await logoutUsuario(); // backend borra cookie
    } catch (e) {
      console.error("Error en logout backend:", e);
    }

    navigate("/login", { replace: true });
  };

  /* --------------------------- Render --------------------------- */

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open} isMobile={isMobile}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            {user?.nombre_restaurante ?? "Dashboard"}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h6" noWrap component="div">
            {user?.nombre}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* --------------------------- Drawer --------------------------- */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
      >
        <DrawerHeader>
          <Typography>Dashboard</Typography>
          <IconButton onClick={handleDrawerClose} sx={{ marginLeft: "40px" }}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />

        {/* Menu Items */}
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/reservas"
              selected={location.pathname === "/reservas"}
            >
              <ListItemIcon>
                <RestaurantIcon />
              </ListItemIcon>
              <ListItemText primary="Reservas" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/ambientes"
              selected={location.pathname === "/ambientes"}
            >
              <ListItemIcon>
                <AddHomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Ambientes" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/tipos-reservas"
              selected={location.pathname === "/tipos-reservas"}
            >
              <ListItemIcon>
                <BentoOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Tipo de Reservas" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/estadisticas"
              selected={location.pathname === "/estadisticas"}
            >
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Estadísticas" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/mesas"
              selected={location.pathname === "/mesas"}
            >
              <ListItemIcon>
                <TableRestaurantIcon />
              </ListItemIcon>
              <ListItemText primary="Mesas" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/inventarios"
              selected={location.pathname === "/inventarios"}
            >
              <ListItemIcon>
                <Inventory2Icon />
              </ListItemIcon>
              <ListItemText primary="Inventarios" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/ventas"
              selected={location.pathname === "/ventas"}
            >
              <ListItemIcon>
                <PointOfSaleIcon />
              </ListItemIcon>
              <ListItemText primary="Ventas" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/usuarios"
              selected={location.pathname === "/usuarios"}
              disabled={!accesosRestaurante}
            >
              <ListItemIcon>
                <GroupAddIcon />
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Main open={open} isMobile={isMobile}>
        <Box sx={theme.mixins.toolbar} />
        {children}
      </Main>
    </Box>
  );
}
