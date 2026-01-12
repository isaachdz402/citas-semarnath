import React from "react";
import { Container } from "react-bootstrap";
import RegresarButtonComponent from "../../components/custom/BotonRegresar";
import imagen from "../../assets/8.svg";

const NotFoundPage = () => {
  return (
    <>
      <Container>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>Página no encontrada</h1>
          <p>Lo sentimos, la página que buscas no existe o no es válida.</p>
          <RegresarButtonComponent />
          <div className="icono mt-5">
            <i>
              <img src={imagen} alt="Ícono de personas" width={500} />
            </i>
          </div>
        </div>
      </Container>
    </>
  );
};

export default NotFoundPage;
