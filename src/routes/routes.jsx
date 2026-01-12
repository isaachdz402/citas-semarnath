import {
  PortalCitas,
  Login,
  NotFoundPage,
  PanelAdmin,
  Usuarios,
  Verificentros,
  Ubicaciones,
} from "../pages";
import ProtectedRoute from "./ProtectedRoute";

export const routes = [
  {
    path: "/*",
    element: <NotFoundPage />, // Ruta para 404
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/citas",
    element: <PortalCitas />,
  },
  {
    path: "/panelAdmin/citas",
    element: <PanelAdmin />,
  },
  {
    path: "/panelAdmin/usuarios",
    element: <Usuarios />,
  },
  {
    path: "/panelAdmin/verificentros",
    element: <Verificentros />,
  },
  {
    path: "/ubicaciones",
    element: <Ubicaciones />,
  },
];
