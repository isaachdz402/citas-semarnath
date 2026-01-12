import React, { useState, useEffect } from "react";
import {
  Form,
  InputGroup,
  Row,
  Col,
  Table,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import * as XLSX from "xlsx";

const TableComponent = ({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  onDownload,
  dataFiltros = [],
  showExportButton = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Registros por página
  const [searchFiltro, setSearchFiltro] = useState({});

  // Filtrar datos según el buscador y filtros
  useEffect(() => {
    let result = data;

    if (searchTerm) {
      result = result.filter((row) =>
        Object.entries(row).some(([key, value]) => {
          if (typeof value === "object" && value !== null) {
            return Object.values(value).some((subValue) =>
              String(subValue).toLowerCase().includes(searchTerm.toLowerCase())
            );
          }
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }

    // Aplicar todos los filtros activos
    Object.entries(searchFiltro).forEach(([filterKey, filterValue]) => {
      if (filterValue) {
        result = result.filter((row) =>
          Object.entries(row).some(([key, value]) => {
            if (typeof value === "object" && value !== null) {
              return Object.values(value).some(
                (subValue) =>
                  String(subValue).toLowerCase() === filterValue.toLowerCase()
              );
            }
            return String(value).toLowerCase() === filterValue.toLowerCase();
          })
        );
      }
    });

    setFilteredData(result);
    setCurrentPage(1);
  }, [searchTerm, data, searchFiltro]);

  // Función para exportar a Excel
  const exportToExcel = () => {
    if (filteredData.length === 0) {
      alert("No hay datos para exportar");
      return;
    }

    // Preparar los datos para Excel excluyendo la columna de acciones
    const excelData = filteredData.map((row) => {
      const excelRow = {};
      Object.entries(columns).forEach(([columnName, columnDef]) => {
        const colKey =
          typeof columnDef === "object" ? columnDef.key : columnDef;

        // Excluir columnas de acciones
        if (typeof columnDef === "object" && columnDef.actions) {
          return;
        }

        // Procesar los datos igual que en la tabla
        if (colKey === "sector.descripcion") {
          excelRow[columnName] = row.sector?.descripcion || "Sin sector";
        } else if (colKey === "fondosDocumentales.nombre") {
          excelRow[columnName] = row.fondosDocumentales?.nombre || "S/N";
        } else if (colKey === "direccion_age.nombre") {
          excelRow[columnName] = row.direccion_age?.nombre || "S/N";
        } else if (colKey === "municipio.nombre") {
          excelRow[columnName] = row.municipio?.nombre || "S/N";
        } else if (colKey === "roles") {
          excelRow[columnName] =
            row.roles
              .filter((rol) => rol !== "rol_user")
              .filter((rol) => rol)
              .map((rol) => String(rol).trim())
              .join(", ") || "Sin roles";
        } else {
          excelRow[columnName] = row[colKey] || "";
        }
      });
      return excelRow;
    });

    // Crear el libro de Excel
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos Filtrados");

    // Generar nombre de archivo con fecha y filtros aplicados
    const today = new Date().toISOString().split("T")[0];
    const activeFilters = Object.entries(searchFiltro)
      .filter(([key, value]) => value)
      .map(([key, value]) => `${key}-${value}`)
      .join("_");

    const fileName = `datos_${
      activeFilters ? activeFilters + "_" : ""
    }${today}.xlsx`;

    // Descargar el archivo
    XLSX.writeFile(workbook, fileName);
  };

  // Paginación
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Cambiar página
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Cambiar cantidad de registros por página
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Resetear a la primera página cuando cambia la cantidad
  };

  return (
    <div className="rounded mb-4">
      {/* Buscador por filtros y botón de exportar */}
      <Row className="d-flex justify-content-end mt-2 flex-wrap">
        {(() => {
          const filtrosEntries = Object.entries(dataFiltros);
          const totalElements = filtrosEntries.length + 2; // +2 por el buscador y botón exportar
          const colSize =
            totalElements > 0 ? Math.max(Math.floor(12 / totalElements), 3) : 4;

          return (
            <Row className="d-flex justify-content-between mt-2 flex-wrap">
              <Col
                xs={12}
                md={8}
                className="d-flex flex-wrap align-items-start gap-2"
              >
                {filtrosEntries.map(([key, values]) => (
                  <Form.Select
                    key={key}
                    aria-label={`Seleccionar ${key}`}
                    name={`filtro_${key}`}
                    className="border-black small-select"
                    style={{ maxWidth: "200px" }}
                    onChange={(e) => {
                      const selectedText =
                        e.target.options[e.target.selectedIndex].text;
                      setSearchFiltro((prev) => ({
                        ...prev,
                        [key]: selectedText === "Todos" ? null : selectedText,
                      }));
                      setCurrentPage(1);
                    }}
                  >
                    {values.length > 0 ? (
                      <>
                        <option value="Todos">Todos</option>
                        {values.map((item) => (
                          <option
                            key={item.id}
                            value={item.descripcion || item.nombre}
                          >
                            {item.descripcion || item.nombre}
                          </option>
                        ))}
                      </>
                    ) : (
                      <option value="">No hay opciones disponibles</option>
                    )}
                  </Form.Select>
                ))}
                {showExportButton && (
                  <Button
                    variant="success"
                    className="small-export-button"
                    onClick={exportToExcel}
                    disabled={filteredData.length === 0}
                  >
                    <i className="bi bi-file-earmark-excel me-2"></i>
                    Exportar
                  </Button>
                )}
              </Col>

              <Col xs={12} md={4}>
                <InputGroup className="border rounded border-black mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Buscar en toda la tabla..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                  <InputGroup.Text className="bg-guinda text-white">
                    <i className="bi bi-search"></i>
                  </InputGroup.Text>
                </InputGroup>
              </Col>
            </Row>
          );
        })()}
      </Row>

      {/* Tabla */}
      <div className="table-responsive rounded">
        <Table bordered striped id="tabla_dinamica" className="">
          <thead>
            <tr>
              {Object.keys(columns).map((col, index) => (
                <th key={index} className="text-center">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedData.length > 0 ? (
              selectedData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(columns).map((colDef, colIndex) => {
                    const colKey =
                      typeof colDef === "object" ? colDef.key : colDef;

                    return (
                      <td key={colIndex} hidden={colKey === ""}>
                        {colKey === "sector.descripcion"
                          ? row.sector?.descripcion || "Sin sector"
                          : colKey === "fondosDocumentales.nombre"
                          ? row.fondosDocumentales?.nombre || "S/N"
                          : colKey === "direccion_age.nombre"
                          ? row.direccion_age?.nombre || "S/N"
                          : colKey === "municipio.nombre"
                          ? row.municipio?.nombre || "S/N"
                          : colKey === "roles"
                          ? row.roles
                              .filter((rol) => rol !== "rol_user")
                              .filter((rol) => rol)
                              .map((rol) => String(rol).trim())
                              .join(", ") || "Sin roles"
                          : row[colKey]}

                        {typeof colDef === "object" && colDef.actions && (
                          <div className="d-flex justify-content-center gap-1">
                            {colDef.actions.map((action) => {
                              if (action.condition && !action.condition(row)) {
                                return null;
                              }

                              return (
                                <button
                                  key={action.action}
                                  className={`btn btn-${action.variant} w-100 mb-2`}
                                  style={{ minWidth: "40px", maxWidth: "50px" }}
                                  onClick={() => {
                                    if (action.action === "view") onView(row);
                                    else if (action.action === "edit")
                                      onEdit(row);
                                    else if (action.action === "delete")
                                      onDelete(row.id);
                                    else if (action.action === "validate")
                                      onEdit(row.id);
                                    else if (action.action === "download")
                                      onDownload(row);
                                  }}
                                  title={action.name}
                                >
                                  <i className={`bi ${action.icon} me-1`}></i>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={Object.keys(columns).length}
                  className="text-center fw-bold"
                >
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <Row className="mb-4">
        {/* Selector de registros por página */}
        <Col md className="d-flex align-items-center">
          <label className="me-2 mb-0">Mostrar:</label>
          <select
            className="form-select w-auto d-inline border-black me-2"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <span className=" mb-0">de {filteredData.length} registros.</span>
        </Col>

        {/* Paginación Manual */}
        <Col md>
          <div className="d-flex justify-content-end align-items-center">
            <a
              className="btn fw-bold text-decoration-underline"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Anterior
            </a>
            <span className="fw-bold">
              Página {currentPage} de {totalPages}
            </span>
            <a
              className="btn fw-bold text-decoration-underline"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </a>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TableComponent;
