import Swal from "sweetalert2";
import { useEffect } from "react";

const SwalAlert = ({
  type = "info",
  title = "",
  text = "",
  showConfirmButton = true,
  showCancelButton = false,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    Swal.fire({
      icon: type,
      title,
      text,
      showConfirmButton,
      showCancelButton,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed && onConfirm) onConfirm();
      if (result.isDismissed && onCancel) onCancel();
    });
  }, []);

  return null;
};

export default SwalAlert;
