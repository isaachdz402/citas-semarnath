import React from "react";
import TableComponent from "./tablaComponet"; // Tu componente original

const VerificentrosTable = ({ data, onLocationClick, onEdit }) => {
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
        {
          name: "Editar",
          action: "edit",
          variant: "primary",
          icon: "bi-pencil",
        },
      ],
    },
  };

  // Funciones que manejan las acciones
  const handleView = (row) => {
    console.log("Ver ubicación:", row);
    onLocationClick(row);
  };

  const handleEdit = (row) => {
    console.log("Editar verificentro:", row);
    onEdit(row);
  };

  return (
    <TableComponent
      columns={columns}
      data={data}
      onView={handleView}
      onEdit={handleEdit}
      showExportButton={false}
    />
  );
};

export default VerificentrosTable;
