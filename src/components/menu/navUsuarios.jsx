import React, { useState } from "react";
import institucion from "../../assets/logo.svg";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../styles/header/header.css";
import { useNavigate } from "react-router-dom";

const Nav2 = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // Esto te lleva a la página anterior en el historial
  };

  return (
    <div className="Nav">
      <div className="icono-titulo">
        <div className="icono">
          <i>
            <img src={institucion} alt="Ícono de personas" width={150} />
          </i>
        </div>
        <div className="titulo">
          <p>MEDIO AMBIENTE</p>
          <p>Secretaría de medio ambiente y recursos naturales</p>
        </div>
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      <ul className={menuOpen ? "enlaces active" : "enlaces"}>
        <li className="nav-item">
          <a className="nav-link" href="#regresar" onClick={handleGoBack}>
            Regresar
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Nav2;
