import Swal from "sweetalert2";

export function showSuccessAlert(title, text) {
  Swal.fire({
    theme: "bootstrap-5-dark",
    title,
    text,
    icon: "success",
  });
}
