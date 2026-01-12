import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import SwalAlert from "./swalAlert";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import Select from "react-select";

const CustomModalComponent = ({
  show,
  onHide,
  header,
  body,
  footer,
  size,
  fullscreen,
  formData,
  onChange,
  onBlur,
  formFields = [],
  onSubmit,
  dateMax,
}) => {
  const [alert, setAlert] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setAlert({
      type: "warning",
      title: "¿Estás seguro?",
      text: "Esta acción no se puede revertir",
      showConfirmButton: true,
      showCancelButton: true,
      onConfirm: async () => {
        await onSubmit(formData);
        setAlert(null); // cerrar después de confirmar
      },
      onCancel: () => setAlert(null),
    });
  };

  return (
    <>
      {alert && <SwalAlert {...alert} />}
      <Modal
        show={show}
        onHide={onHide}
        size={size}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className=""
        backdrop="static"
        fullscreen={fullscreen}
        dialogClassName={fullscreen ? "modal-dialog-scrollable" : ""}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="fw-bold">
            {header}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {body}
            <Row>
              {formFields.map((field, index) => (
                <Col
                  key={index}
                  xs={field.xm}
                  sm={field.sm}
                  md={field.md}
                  lg={field.lg}
                  xl={field.xl}
                  className="mb-3"
                  hidden={field.hidden}
                >
                  {field.multiple ? (
                    <div className="form-floating">
                      <Select
                        id={field.name}
                        name={field.name}
                        options={field.options || []}
                        value={
                          field.multiple
                            ? (field.options || []).filter((opt) =>
                                formData[field.name]?.includes(opt.value)
                              )
                            : (field.options || []).find(
                                (opt) => opt.value === formData[field.name]
                              )
                        }
                        onChange={(selected) => {
                          onChange({
                            target: {
                              name: field.name,
                              value: field.multiple
                                ? selected.map((opt) => opt.value)
                                : selected?.value || "",
                            },
                          });
                        }}
                        isMulti={field.multiple || false}
                        isSearchable={false}
                        placeholder=""
                        classNamePrefix="react-select"
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            borderColor: state.isFocused ? "#A02142" : "#000",
                            boxShadow: state.isFocused
                              ? "0 0 10px rgba(160, 33, 66, 0.4)"
                              : "none",
                            "&:hover": { borderColor: "#000" },
                            minHeight: "58px",
                            borderRadius: "0.375rem",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#6c757d",
                            opacity: 0.7,
                          }),
                        }}
                        required={field.required}
                      />

                      <label
                        htmlFor={field.name}
                        className="form-label text-break"
                      >
                        {field.label}{" "}
                        {field.required && (
                          <span style={{ color: "red" }}>*</span>
                        )}
                      </label>
                    </div>
                  ) : field.type === "select2" ? (
                    // SELECT SIMPLE con react-select como el que quieres
                    <div className="form-floating">
                      <Select
                        id={field.name}
                        name={field.name}
                        options={field.options || []}
                        value={(field.options || []).find(
                          (opt) => opt.value === formData[field.name]
                        )}
                        onChange={(selectedOption) => {
                          onChange({
                            target: {
                              name: field.name,
                              value: selectedOption?.value || "",
                            },
                          });
                        }}
                        onBlur={onBlur}
                        placeholder=" "
                        classNamePrefix="react-select"
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            borderColor: state.isFocused ? "#A02142" : "#000",
                            boxShadow: state.isFocused
                              ? "0 0 10px rgba(160, 33, 66, 0.4)"
                              : "none",
                            "&:hover": { borderColor: "#000" },
                            minHeight: "58px",
                            borderRadius: "0.375rem",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#6c757d",
                            opacity: 0.7,
                          }),
                        }}
                        required={field.required}
                      />
                      <label
                        htmlFor={field.name}
                        className="form-label text-break"
                      >
                        {field.label}{" "}
                        {field.required && (
                          <span style={{ color: "red" }}>*</span>
                        )}
                      </label>
                    </div>
                  ) : (
                    <FloatingLabel
                      controlId={field.name}
                      label={
                        <span
                          style={{
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                            display: "inline-block",
                            maxWidth: "100%",
                          }}
                        >
                          {field.label}{" "}
                          {field.required && (
                            <span style={{ color: "red" }}>*</span>
                          )}
                        </span>
                      }
                    >
                      {field.type === "select" ? (
                        <Form.Select
                          name={field.name}
                          value={formData[field.name]}
                          onChange={onChange}
                          className="border-black"
                          multiple={field.multiple}
                          required={field.required}
                        >
                          {field.options.map((option, idx) => (
                            <option
                              key={idx}
                              value={option.value}
                              title={option.estructura}
                            >
                              {option.label}
                            </option>
                          ))}
                        </Form.Select>
                      ) : field.type === "text" ? (
                        <Form.Control
                          type={field.type}
                          name={field.name}
                          maxLength={
                            field.maxLength ? field.maxLength : undefined
                          }
                          value={formData[field.name]}
                          onChange={onChange}
                          onBlur={onBlur}
                          className="border-black"
                          required={field.required}
                        />
                      ) : field.type === "number" ? (
                        <Form.Control
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={onChange}
                          onBlur={onBlur}
                          className="border-black"
                          required={field.required}
                        />
                      ) : field.type === "email" ? (
                        <Form.Control
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={onChange}
                          onBlur={onBlur}
                          className="border-black"
                          required={field.required}
                        />
                      ) : field.type === "password" ? (
                        <>
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={onChange}
                            onBlur={onBlur}
                            className="border-black"
                            required={field.required}
                            disabled={field.disabled}
                          />
                          <Button
                            variant="link"
                            onClick={() =>
                              setShowPassword((prevState) => !prevState)
                            }
                            className="position-absolute end-0 top-50 translate-middle-y"
                            disabled={field.disabled}
                          >
                            {showPassword ? (
                              <EyeSlash color="black" />
                            ) : (
                              <Eye color="black" />
                            )}
                          </Button>
                        </>
                      ) : field.type === "date" ? (
                        <Form.Control
                          type="date"
                          name={field.name}
                          value={formData[field.name]}
                          onChange={onChange}
                          onBlur={onBlur}
                          className="border-black"
                          required={field.required}
                          max={dateMax}
                        />
                      ) : field.type === "file" ? (
                        <Form.Control
                          type="file"
                          name={field.name}
                          onChange={onChange}
                          onBlur={onBlur}
                          className="border-black"
                          required={field.required}
                        />
                      ) : field.type === "datetime-local" ? (
                        <Form.Control
                          type="datetime-local"
                          name={field.name}
                          value={formData[field.name]}
                          onChange={onChange}
                          onBlur={onBlur}
                          className="border-black"
                          required={field.required}
                          max={dateMax}
                        />
                      ) : (
                        <Form.Control
                          as={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={onChange}
                          onBlur={onBlur}
                          className="border-black"
                          required={field.required}
                          style={{ height: "90px" }} // Ajusta la altura según necesites
                        />
                      )}
                    </FloatingLabel>
                  )}
                </Col>
              ))}
            </Row>
          </Modal.Body>
          <Modal.Footer>{footer}</Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CustomModalComponent;
