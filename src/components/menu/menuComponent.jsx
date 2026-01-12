import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate, NavLink, Link } from "react-router-dom";

const MenuComponent = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // Esto te lleva a la página anterior en el historial
  };

  return (
    <Navbar expand="md" className="bg-dorado fw-bold shadow text-white">
      <Container>
        <Navbar.Brand className="text-white">SEMARNAT</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} className="text-white" to="/panelAdmin/citas">
              Citas
            </Nav.Link>
            <Nav.Link
              as={Link}
              className="text-white"
              to="/panelAdmin/usuarios"
            >
              Usuarios
            </Nav.Link>
            <Nav.Link
              as={Link}
              className="text-white"
              to="/panelAdmin/verificentros"
            >
              Centros de Verificación
            </Nav.Link>

            {/* <NavDropdown
              title={<span className="text-white">Usuarios</span>}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/age/validar-titulares">
                Titular del Sujeto Obligado
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/age/personal-direccion">
                Personal de Archivo
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MenuComponent;
