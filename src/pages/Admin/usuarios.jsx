import React, { useState } from "react";
import Nav from "../../components/menu/navComponent";
import MenuComponent from "../../components/menu/menuComponent";
import TableComponent from "../../components/tabla/tablaComponet";
import "../../styles/panelAdmin/panelAdmin.css";
import { dataUsuario } from "../../helpers/dataUsuarios";

const Usuario = () => {
  const columns = {
    Nombre: "nombre",
    Correo: "correo",
    Teléfono: "telefono",
    Estado: "estatus",
    Acción: {
      key: "accion",
      actions: [
        {
          name: "Editar",
          action: "edit",
          variant: "primary",
          icon: "bi-pencil",
        },
      ],
    },
  };

  const data = dataUsuario();

  const [loading, setLoading] = useState(false);

  const handleEdit = () => {};

  return (
    <div>
      <Nav />
      <MenuComponent />
      <div className="contenido">
        <div className="contenedor-texto">
          <h2>Catálogo de Usuarios</h2>
          <p>Gestionar usuarios del sistema</p>
        </div>
        <TableComponent
          columns={columns}
          data={data}
          onEdit={handleEdit}
          loading={loading}
          showExportButton={false}
        />
      </div>
    </div>
  );
};

export default Usuario;
