import React from "react";
import Header from "../../components/header/header";
import { Calendar, Search, ArrowClockwise } from "react-bootstrap-icons";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaSearch } from "react-icons/fa";
import { CardLarge } from "../../components/cards/cardLarge";
import CustomCard from "../../components/cards/customcard";
import CardIntrucciones from "../../components/cards/cardInstrucciones";
import CardCalendario from "../../components/cards/cardCalendario";
import { useNavigate } from "react-router-dom";
import "../../styles/cards/customCard.css";
import "../../styles/portalCitas/portalCitas.css";
// Importar el PDF
import avisoPDF from "../../doc/aviso_privacidad.pdf";

const PortalCitas = () => {
  const abrirAvisoPrivacidad = () => {
    window.open(avisoPDF, "_blank");
  };

  const navigate = useNavigate();

  const ubicacion = () => {
    navigate("/ubicaciones");
  };

  return (
    <div>
      <Header />
      <CardLarge />
      <div id="citas" className="contenedor-cards">
        <CustomCard
          icon={Calendar}
          title="Registrar una cita"
          description="Agenda tu verificación vehicular"
          buttonText="Agendar Cita"
          buttonColor="var(--burgundy-base)"
        />
        <CustomCard
          icon={Search}
          title="Consultar una cita"
          description="Revisa el estatus de tu cita"
          buttonText="Consultar Cita"
          buttonColor="var(--gold-base)"
        />
        <CustomCard
          icon={ArrowClockwise}
          title="Recuperar cita"
          description="Recupera tu cita perdida o cancelada"
          buttonText="Recuperar Cita"
          buttonColor="var(--burgundy-light)"
        />
      </div>
      <div id="informacion" className="contendor-instrucciones">
        <CardIntrucciones />
        <CardCalendario />
      </div>
      <div className="directorio">
        <div className="texto-directorio">
          <h5>¿Necesitas más información?</h5>
          <p>Consulta nuestros recursos adicionales</p>
        </div>
        <div className="botones">
          <button onClick={ubicacion}>
            <i className="bi bi-geo-alt icono-boton"></i>Directorio de Centros
          </button>
          <button onClick={abrirAvisoPrivacidad}>
            <i className="bi bi-file-earmark-text icono-boton"></i>Aviso de
            privacidad
          </button>
        </div>
      </div>
      <footer id="contacto" className="footer">
        <div className="footer-content">
          <div className="footer-contact">
            <h5>Contacto</h5>
            <p>
              <FaPhone className="icon" /> +52 (771) 717-1111
            </p>
            <p>
              <FaEnvelope className="icon" /> semarnat@hidalgo.gob.mx
            </p>
          </div>

          <div className="footer-schedule">
            <h5>Horarios de Atención</h5>
            <div className="schedule-row">
              <span style={{ color: "white" }}>Lunes - Viernes:</span>{" "}
              <span>8:00 AM - 4:00 PM</span>
            </div>
            <div className="schedule-row">
              <span style={{ color: "white" }}>Sábados:</span>{" "}
              <span>9:00 AM - 1:00 PM</span>
            </div>
          </div>
        </div>
        <div
          style={{
            height: "1px",
            backgroundColor: "#b0b0b0",
            width: "80%",
            marginLeft: "10%",
          }}
        ></div>

        <div className="footer-bottom">
          <p>
            Secretaría de Medio Ambiente y Recursos Naturales - Gobierno del
            Estado de Hidalgo
          </p>
          <p>Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default PortalCitas;
