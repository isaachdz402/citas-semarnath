import React, { useState } from "react";
import "../../styles/login/login.css";
import institucion from "../../assets/logo.svg";
import imagen from "../../assets/2.svg";

const Login = () => {
  // Estado para controlar si la contraseña es visible
  const [mostrarPassword, setMostrarPassword] = useState(false);

  // Función para alternar la visibilidad de la contraseña
  const toggleMostrarPassword = () => {
    setMostrarPassword(!mostrarPassword);
  };

  return (
    <div className="login">
      <div className="izquierdo">
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
        <div className="titulo-login">
          <h1>
            Portal de <span className="color-verificacion">Verificación</span>{" "}
            Vehicular
          </h1>
        </div>
        <div className="texto-login">
          <p>
            Sistema inteligente para agendar tu cita de verificación vehicular
            de manera rápida y segura.
          </p>
        </div>
        <div className="imagen">
          <img src={imagen} alt="Ilustración del sistema" />
        </div>
      </div>
      <div className="derecho">
        <div className="titulo-derecho">
          <h1>Bienvenido</h1>
        </div>
        <div className="texto-derecho">
          <p>Accede a tu cuenta para gestionar tus citas de verificación</p>
        </div>
        <div className="formulario-login">
          <form>
            <div className="form-group">
              <label htmlFor="usuario">Usuario </label>
              <div className="input-wrapper">
                <i className="bi bi-person-fill"></i>
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  placeholder="Ingresa tu usuario "
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="input-wrapper">
                <i className="bi bi-lock-fill"></i>
                <input
                  type={mostrarPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <i
                  className={`bi ${
                    mostrarPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                  } icon-eye`}
                  onClick={toggleMostrarPassword}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
            </div>

            <button type="submit" className="boton-iniciar">
              <i className="bi bi-shield-lock-fill"></i> Iniciar Sesión
            </button>

            <div className="acciones-login">
              <a href="#">
                <i className="bi bi-key-fill"></i> ¿Olvidaste tu contraseña?
              </a>
            </div>

            <div className="crear-cuenta">
              <p>¿No tienes cuenta?</p>
              <a href="#">
                <i className="bi bi-person-plus-fill"></i> Crear cuenta nueva
              </a>
            </div>

            <div
              style={{
                height: "1px",
                backgroundColor: "#b0b0b0",
                width: "80%",
                marginLeft: "10%",
                marginTop: "5%",
              }}
            ></div>

            <div className="texto-bajo">
              <p>© 2024 Gobierno del Estado de Hidalgo</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
