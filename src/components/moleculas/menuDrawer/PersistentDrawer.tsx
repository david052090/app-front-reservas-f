import * as React from "react";
import { jwtDecode } from "jwt-decode";
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
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import BentoOutlinedIcon from "@mui/icons-material/BentoOutlined";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store"; // ajusta ruta
import { logout, setAuthFromStorage } from "../../../store/authSlice"; // ajusta ruta
import {
  esTokenValido,
  handleStorageAuth,
  handleVisibilityAuth,
} from "../../../utils/esTokenValido"; // ajusta ruta
import { CircularProgress } from "@mui/material";
const drawerWidth = 240;

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "isMobile",
})<{
  open?: boolean;
  isMobile: boolean;
}>(({ theme, open, isMobile }) => ({
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
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "isMobile",
})<AppBarProps & { isMobile: boolean }>(({ theme, open, isMobile }) => ({
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

export default function PersistentDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // <-- Detectamos si es pantalla pequeña
  const [open, setOpen] = React.useState(!isMobile);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((s: RootState) => s.auth);
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    setOpen(!isMobile); // <-- Sincronizamos estado open con isMobile
  }, [isMobile]);

  useEffect(() => {
    if (isAuthenticated) {
      setChecking(false);
      return;
    }
    const stored = localStorage.getItem("authToken");
    if (stored && esTokenValido(stored)) {
      dispatch(setAuthFromStorage(stored));
    }
    setChecking(false);
  }, [dispatch, isAuthenticated]);

  const userName = useMemo(() => {
    if (!token) return "Dashboard";
    try {
      const decoded: any = jwtDecode(token);
      return decoded?.nombre_restaurante || "Dashboard";
    } catch {
      return "Dashboard";
    }
  }, [token]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const listener = handleStorageAuth(dispatch, navigate, location);
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  }, [dispatch, navigate, location]);

  useEffect(() => {
    const listener = handleVisibilityAuth(dispatch, navigate, location);
    document.addEventListener("visibilitychange", listener);
    return () => document.removeEventListener("visibilitychange", listener);
  }, [dispatch, navigate, location]);

  if (checking) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
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
            sx={{
              mr: 2,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {userName}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={handleLogout} edge="end">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        onClose={handleDrawerClose} // <-- Necesario para temporary en móvil
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
        </List>
        <List>
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
        </List>
        <List>
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
        </List>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/estadisticas"
              selected={location.pathname === "/estadisticas"}
            >
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Estadisticas" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open} isMobile={isMobile}>
        <Box sx={{ ...theme.mixins.toolbar }} />
        {children}
      </Main>
    </Box>
  );
}
