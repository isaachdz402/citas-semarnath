import React from "react";
import "../../styles/cards/cardInstrucciones.css";

const CardIntrucciones = () => {
  return (
    <div className="card-instruccion">
      <div className="titulo-contenedor">
        <div className="titulo2">
          <i class="bi bi-file-earmark-text"></i>
          <p>Documentación requerida</p>
        </div>
        <p className="texto1">Original y copia de los siguientes documentos</p>
      </div>
      <div className="nuevos">
        <h5>Vehículos nuevos</h5>
        <ul className="lista-personalizada">
          <li>Factura o Carta Factura vigente.</li>
          <li>
            Formato de "Incorporación al Registro Vehicular Estatal de Hidalgo"
            y/o formato de "Trámite de placas".
          </li>
          <li>Tarjeta de circulación</li>
          <li>Cita digital o impresa</li>
        </ul>
      </div>
      <div className="usados">
        <h5>Vehículos usados</h5>
        <ul className="lista-personalizada">
          <li>Factura o Carta Factura vigente.</li>
          <li>
            Formato de "Incorporación al Registro Vehicular Estatal de Hidalgo"
            y/o formato de "Trámite de placas".
          </li>
          <li>Tarjeta de circulación</li>
          <li>Cita digital o impresa</li>
        </ul>
      </div>
    </div>
  );
};

export default CardIntrucciones;
