import React from "react";
import "../../styles/cards/cardLarge.css";

// Función fake para datos
const getFakeData = () => {
  return {
    total: 1234, // número de ejemplo
    dias: 7, // días de ejemplo
  };
};

export function CardLarge({ total, dias }) {
  // Usar datos reales o fallback de fake
  const { total: fakeTotal, dias: fakeDias } = getFakeData();

  return (
    <div className="card-citas">
      <h2 className="card-title">Total Actual de Citas Disponibles:</h2>
      <p className="card-number">{(total ?? fakeTotal).toLocaleString()}</p>
      <span className="card-subtitle">
        PARA LOS PRÓXIMOS {dias ?? fakeDias} DÍAS
      </span>
    </div>
  );
}
