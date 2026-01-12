import React, { useState } from "react";
import Nav from "../../components/menu/navComponent";
import MenuComponent from "../../components/menu/menuComponent";
import TableComponent from "../../components/tabla/tablaComponet";
import "../../styles/panelAdmin/panelAdmin.css";
import { getMockData } from "../../helpers/data";

const PanelAdmin = () => {
  const columns = {
    Placas: "placas",
    Fecha: "fecha",
    "Centro Verificación": "centro",
    Estado: "estatus",
    Acción: {
      key: "accion",
      actions: [
        {
          name: "Descargar",
          action: "download",
          variant: "secondary",
          icon: "bi-download",
        },
      ],
    },
  };

  const data = getMockData();

  // ✅ Filtro por centro
  const dataFiltros = {
    "Centro Verificación": [
      { id: 1, nombre: "Centro Histórico" },
      { id: 2, nombre: "Archivo Central" },
      { id: 3, nombre: "Zona Norte" },
    ],
  };

  const [loading, setLoading] = useState(false);

  const handleDownload = (row) => {
    if (!row.pdfBlob) return alert("No hay PDF disponible");

    const fileURL = URL.createObjectURL(row.pdfBlob);
    window.open(fileURL, "_blank"); // abre en otra ventana
  };

  return (
    <div>
      <Nav />
      <MenuComponent />
      <div className="contenido">
        <div className="contenedor-texto">
          <h2>Gestión de Citas</h2>
          <p>Ver y descargar citas para verificación vehicular</p>
        </div>
        <TableComponent
          columns={columns}
          data={data}
          onDownload={handleDownload}
          loading={loading}
          dataFiltros={dataFiltros}
          showExportButton={true}
        />
      </div>
    </div>
  );
};

export default PanelAdmin;
