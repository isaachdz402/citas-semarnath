import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isUserReady } = useContext(UserContext);

  // Esperar a que se cargue el usuario del localStorage
  if (!isUserReady) {
    return <div>Cargando...</div>; // o un spinner
  }

  if (!user) {
    return <Navigate to="/Login" replace />;
  }

  const hasAccess =
    !allowedRoles ||
    (user.roles && user.roles.some((r) => allowedRoles.includes(r.id)));

  if (!hasAccess) {
    return <Navigate to="/Login" replace />;
  }

  return children;
};

export default ProtectedRoute;
