import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap"; // Usamos React Bootstrap para el botón, si lo prefieres

const RegresarButtonComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    // Si el historial es corto o estás en una ruta problemática
    if (
      window.history.length <= 2 ||
      location.pathname === "/not-found" || // o cualquier ruta incorrecta
      document.referrer === "" // No hay página anterior válida
    ) {
      navigate("/"); // Ruta segura
    } else {
      navigate(-1); // Volver normalmente
    }
  };

  return (
    <Button
      variant="link"
      className="text-black fw-bold mt-3"
      onClick={handleBack}
    >
      Regresar
    </Button>
  );
};

export default RegresarButtonComponent;
