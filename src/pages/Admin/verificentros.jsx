import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import VerificentrosTable from "../../components/tabla/VerificentrosTable";
import MenuComponent from "../../components/menu/menuComponent";
import Nav from "../../components/menu/navComponent";
import CustomModalComponent from "../../components/modal/customModal";
import "../../styles/panelAdmin/panelAdmin.css";

const VerificentrosPage = () => {
  const [selectedVerificentro, setSelectedVerificentro] = useState(null);
  const [mapKey, setMapKey] = useState(0);

  // Estados para el modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingVerificentro, setEditingVerificentro] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    lat: "",
    lng: "",
  });

  // Datos de verificentros en Pachuca de Soto, Hidalgo
  const [verificentros, setVerificentros] = useState([
    {
      id: 1,
      nombre: "CENTRO No 01, ACTOPAN",
      direccion:
        "Av. Del Trabajo No. 61, Col. Cañada Aviación, CP 42512, Actopan, Hgo.",
      telefono: "771-714-2580",
      lat: 20.281617,
      lng: -98.965194,
    },
    {
      id: 2,
      nombre: "CENTRO No 02, HUEJUTLA",
      direccion:
        "Carr. Nacional México - Tampico No 24, Col. Benito Juárez, CP 43000, Huejutla de Reyes, Hidalgo.",
      telefono: "771-797-1234",
      lat: 21.1525149,
      lng: -98.4214389,
    },
    {
      id: 3,
      nombre: "CENTRO No 03, MINERAL DE LA REFORMA",
      direccion:
        "Carr. Pachuca - Tulancingo No 1441, Colonia Álamo Rústico, CP 42184, Mineral de la Reforma, Hidalgo.",
      telefono: "771-713-4567",
      lat: 20.1001231,
      lng: -98.7171086,
    },
    {
      id: 4,
      nombre: "CENTRO No 05, LAS TORRES",
      direccion:
        "Boulevard Las Torres No.1504, Colonia San Antonio el Desmonte, C.P. 42083, Pachuca de Soto, Hidalgo.",
      telefono: "771-715-8901",
      lat: 20.038761,
      lng: -98.785391,
    },
    {
      id: 5,
      nombre: "CENTRO 06, VICENTE SEGURA",
      direccion:
        "Calle Vicente Segura No. 802, Colonia Revolución, C.P. 42060, Pachuca de Soto, Hidalgo.",
      telefono: "771-716-2345",
      lat: 20.117686,
      lng: -98.743244,
    },
    {
      id: 6,
      nombre: "CENTRO No 07, TIZAYUCA",
      direccion:
        "Calle 2 Oriente No. 14 Ciudad Industrial Tizayuca, CP 43804, Tizayuca, Hidalgo.",
      telefono: "771-718-9012",
      lat: 19.830251,
      lng: -98.976627,
    },
    {
      id: 7,
      nombre: "CENTRO No 08, TEPEJI DEL RIO",
      direccion:
        "Antigua carretera México - Querétaro esquina con Av. Miguel Hidalgo Km 0+800 int. A. Colonia San Mateo Segunda Sección, CP 42850, Tepeji del Río de Ocampo, Hidalgo.",
      telefono: "771-719-3456",
      lat: 19.892366,
      lng: -99.341496,
    },
    {
      id: 8,
      nombre: "CENTRO No 09, TULA DE ALLENDE",
      direccion:
        "Carretera Tula - Jorobas Km. 32.7, Col. El Llano 2a. Sección, CP 42820, Tula de Allende, Hidalgo.",
      telefono: "771-719-3456",
      lat: 20.054337,
      lng: -99.306109,
    },
    {
      id: 9,
      nombre: "CENTRO 11, TULANCINGO LA JOYA",
      direccion:
        "Calle Libramiento La Joya No. 100, Fraccionamiento Corredor Bicentenario, CP 43649, Tulancingo, Hidalgo.",
      telefono: "771-719-3456",
      lat: 20.0716188,
      lng: -98.3852709,
    },
    {
      id: 10,
      nombre: "CENTRO No 12 ATITALAQUIA",
      direccion: "CALLE CUAUHTEMOC 1 EL TABLON CENTRO",
      telefono: "771-719-3456",
      lat: 20.053876,
      lng: -99.216385,
    },
  ]);

  // Campos del formulario para el modal
  const formFields = [
    {
      name: "nombre",
      label: "Nombre del Centro",
      type: "text",
      required: true,
      md: 12,
      maxLength: 100,
    },
    {
      name: "direccion",
      label: "Dirección",
      type: "textarea",
      required: true,
      md: 12,
      maxLength: 300,
    },
    {
      name: "telefono",
      label: "Teléfono",
      type: "text",
      required: true,
      md: 6,
      maxLength: 15,
    },
    {
      name: "lat",
      label: "Latitud",
      type: "number",
      required: true,
      md: 3,
    },
    {
      name: "lng",
      label: "Longitud",
      type: "number",
      required: true,
      md: 3,
    },
  ];

  // Función para editar datos de la tabla
  const onEdit = (verificentro) => {
    console.log("onEdit llamado con:", verificentro);
    setEditingVerificentro(verificentro);
    setFormData({
      nombre: verificentro.nombre,
      direccion: verificentro.direccion,
      telefono: verificentro.telefono,
      lat: verificentro.lat.toString(),
      lng: verificentro.lng.toString(),
    });
    setShowEditModal(true);
  };

  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para manejar blur (opcional)
  const handleFormBlur = (e) => {
    // Aquí puedes agregar validaciones si las necesitas
  };

  // Función para enviar el formulario
  const handleSubmit = async (data) => {
    try {
      // Actualizar el verificentro en el estado
      const updatedVerificentros = verificentros.map((v) =>
        v.id === editingVerificentro.id
          ? {
              ...v,
              nombre: data.nombre,
              direccion: data.direccion,
              telefono: data.telefono,
              lat: parseFloat(data.lat),
              lng: parseFloat(data.lng),
            }
          : v
      );

      setVerificentros(updatedVerificentros);

      // Si el verificentro editado es el seleccionado actualmente, actualizarlo también
      if (
        selectedVerificentro &&
        selectedVerificentro.id === editingVerificentro.id
      ) {
        const updatedSelected = updatedVerificentros.find(
          (v) => v.id === editingVerificentro.id
        );
        setSelectedVerificentro(updatedSelected);
      }

      // Cerrar el modal
      setShowEditModal(false);
      setEditingVerificentro(null);

      // Aquí puedes agregar una notificación de éxito si la tienes
      console.log("Verificentro actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar el verificentro:", error);
      // Aquí puedes agregar manejo de errores
    }
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingVerificentro(null);
    setFormData({
      nombre: "",
      direccion: "",
      telefono: "",
      lat: "",
      lng: "",
    });
  };

  // Función para manejar la selección de ubicación
  const handleLocationClick = (verificentro) => {
    setSelectedVerificentro(verificentro);
    setMapKey((prev) => prev + 1);

    // Scroll suave al mapa
    setTimeout(() => {
      const mapContainer = document.getElementById("mapa-container");
      if (mapContainer) {
        mapContainer.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  useEffect(() => {
    // Seleccionar el primer verificentro por defecto
    if (verificentros.length > 0 && !selectedVerificentro) {
      setSelectedVerificentro(verificentros[0]);
    }
  }, [verificentros]);

  return (
    <div>
      <Nav />
      <MenuComponent />
      <div className="contenido">
        <Row>
          <Col>
            {/* Header */}
            <div className="contenedor-texto">
              <h2>Catálogo de Verificentros</h2>
              <p>Gestionar verificentros del sistema</p>
            </div>

            {/* Tabla de verificentros */}
            <VerificentrosTable
              data={verificentros}
              onLocationClick={handleLocationClick}
              onEdit={onEdit}
            />

            {/* Mapa */}
            <Card className="shadow" id="mapa-container">
              <Card.Header className="bg-success text-white">
                <h4 className="mb-0">
                  <i className="bi bi-geo-alt me-2"></i>
                  Ubicación
                  {selectedVerificentro && (
                    <span className="fw-normal">
                      {" "}
                      - {selectedVerificentro.nombre}
                    </span>
                  )}
                </h4>
              </Card.Header>
              <Card.Body>
                {selectedVerificentro ? (
                  <div>
                    {/* Información del verificentro seleccionado */}
                    <div className="alert alert-info mb-4">
                      <Row>
                        <Col md={8}>
                          <h5 className="alert-heading">
                            <i className="bi bi-building me-2"></i>
                            {selectedVerificentro.nombre}
                          </h5>
                          <p className="mb-2">
                            <i className="bi bi-geo-alt me-2"></i>
                            {selectedVerificentro.direccion}
                          </p>
                          <p className="mb-0">
                            <i className="bi bi-telephone me-2"></i>
                            {selectedVerificentro.telefono}
                          </p>
                        </Col>
                        <Col md={4} className="text-md-end">
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              selectedVerificentro.direccion
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary me-2 mb-2"
                          >
                            <i className="bi bi-geo-alt me-1"></i>
                            Google Maps
                          </a>
                          <a
                            href={`https://waze.com/ul?q=${encodeURIComponent(
                              selectedVerificentro.direccion
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-info mb-2"
                          >
                            <i className="bi bi-car-front me-1"></i>
                            Waze
                          </a>
                        </Col>
                      </Row>
                    </div>

                    <div
                      style={{ height: "400px", width: "100%" }}
                      className="rounded overflow-hidden shadow-sm"
                    >
                      <iframe
                        title="Ubicación del Verificentro"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        src={`https://www.google.com/maps?q=${selectedVerificentro.lat},${selectedVerificentro.lng}&z=15&output=embed`}
                      ></iframe>
                    </div>

                    {/* Información adicional */}
                    <div className="mt-3">
                      <small className="text-muted">
                        <i className="bi bi-info-circle me-1"></i>
                        Haz clic en los botones de arriba para obtener
                        direcciones paso a paso
                      </small>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <i
                      className="bi bi-geo-alt text-muted"
                      style={{ fontSize: "4rem" }}
                    ></i>
                    <p className="text-muted mt-3">
                      Selecciona un verificentro de la tabla para ver su
                      ubicación
                    </p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Modal de edición */}
      <CustomModalComponent
        show={showEditModal}
        onHide={handleCloseModal}
        header="Editar Verificentro"
        size="lg"
        formData={formData}
        setFormData={setFormData}
        onChange={handleFormChange}
        onBlur={handleFormBlur}
        formFields={formFields}
        onSubmit={handleSubmit}
        footer={
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleCloseModal}>
              <i className="bi bi-x-circle me-2"></i>
              Cancelar
            </Button>
            <Button variant="success" type="submit">
              <i className="bi bi-check-circle me-2"></i>
              Guardar Cambios
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default VerificentrosPage;
