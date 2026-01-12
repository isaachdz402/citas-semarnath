import { lazy } from "react";

export const NotFoundPage = lazy(() => import("./NotFound/NotFound"));
export const PortalCitas = lazy(() => import("./Citas/portalCitas"));
export const Login = lazy(() => import("./Login/Login"));
export const PanelAdmin = lazy(() => import("./Admin/panelAdmin"));
export const Usuarios = lazy(() => import("./Admin/usuarios"));
export const Verificentros = lazy(() => import("./Admin/verificentros"));
export const Ubicaciones = lazy(() => import("./Citas/ubicaciones"));
