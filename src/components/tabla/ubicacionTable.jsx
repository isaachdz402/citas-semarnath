import React from "react";
import TableComponent from "./tablaComponet"; // Tu componente original

const UbicacionTable = ({ data, onLocationClick }) => {
  // Configuración de columnas para tu TableComponent
  const columns = {
    Nombre: "nombre",
    Dirección: "direccion",
    Teléfono: "telefono",
    Acciones: {
      key: "acciones",
      actions: [
        {
          action: "view",
          name: "Ver ubicación",
          icon: "bi-geo-alt-fill",
          variant: "success",
        },
      ],
    },
  };

  // Funciones que manejan las acciones
  const handleView = (row) => {
    onLocationClick(row);
  };

  return (
    <TableComponent
      columns={columns}
      data={data}
      onView={handleView}
      showExportButton={false}
    />
  );
};

export default UbicacionTable;
