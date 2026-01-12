import React, { useState } from "react";
import "../../styles/cards/cardCalendario.css";

const CardCalendario = () => {
  const [activeTab, setActiveTab] = useState("primer");

  return (
    <div className="card-instruccion">
      <div className="titulo-contenedor">
        <div className="titulo2">
          <i class="bi bi-calendar-date"></i>
          <p>Calendario de Verificación Vehicular</p>
        </div>
      </div>
      <div className="tabs">
        <button
          className={activeTab === "primer" ? "tab active" : "tab"}
          onClick={() => setActiveTab("primer")}
        >
          Primer periodo
        </button>
        <button
          className={activeTab === "segundo" ? "tab active" : "tab"}
          onClick={() => setActiveTab("segundo")}
        >
          Segundo periodo
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "primer" && (
          <div className="engomado-lista">
            <div className="engomado-item">
              <div className="cuadro amarillo"></div>
              <p>
                Enero - Febrero: Engomado amarillo con placas que terminen en 5
                o 6
              </p>
            </div>
            <div className="engomado-item">
              <div className="cuadro rosa"></div>
              <p>
                Febrero - Marzo: Engomado rosa con placas que terminen en 7 u 8
              </p>
            </div>
            <div className="engomado-item">
              <div className="cuadro rojo"></div>
              <p>
                Marzo - Abril: Engomado rojo con placas que terminen en 3 o 4
              </p>
            </div>
            <div className="engomado-item">
              <div className="cuadro verde"></div>
              <p>
                Abril - Mayo: Engomado verde con placas que terminen en 1 o 2
              </p>
            </div>
            <div className="engomado-item">
              <div className="cuadro azul"></div>
              <p>
                Mayo - Junio: Engomado azul con placas que terminen en 9 y 0
              </p>
            </div>
          </div>
        )}
        {activeTab === "segundo" && (
          <div className="engomado-lista">
            <div className="engomado-item">
              <div className="cuadro amarillo"></div>
              <p>
                Julio - Agosto: Engomado amarillo con placas que terminen en 5 o
                6
              </p>
            </div>
            <div className="engomado-item">
              <div className="cuadro rosa"></div>
              <p>
                Agosto - Septiembre: Engomado rosa con placas que terminen en 7
                u 8
              </p>
            </div>
            <div className="engomado-item">
              <div className="cuadro rojo"></div>
              <p>
                Septiembre - Octubre: Engomado rojo con placas que terminen en 3
                o 4
              </p>
            </div>
            <div className="engomado-item">
              <div className="cuadro verde"></div>
              <p>
                Octubre - Noviembre: Engomado verde con placas que terminen en 1
                o 2
              </p>
            </div>
            <div className="engomado-item">
              <div className="cuadro azul"></div>
              <p>
                Noviembre - Diciembre: Engomado azul con placas que terminen en
                9 y 0
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardCalendario;
