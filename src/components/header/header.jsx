import React, { useState } from "react";
import institucion from "../../assets/logo.svg";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../styles/header/header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

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
          <a
            className="nav-link"
            href="#citas"
            onClick={() => setMenuOpen(false)}
          >
            CITAS
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="#informacion"
            onClick={() => setMenuOpen(false)}
          >
            INFORMACION
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="#contacto"
            onClick={() => setMenuOpen(false)}
          >
            CONTACTO
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
