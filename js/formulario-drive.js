const form = document.getElementById("registration-form");
const submitButton = form.querySelector("button[type='submit']");
const modal = document.getElementById("success-modal");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const ciudad = document.getElementById("ciudad").value;
  const departamento = document.getElementById("departamento").value;
  const sucursal = document.getElementById("sucursal").value;
  const comentarios = document.getElementById("comentarios").value;
  const archivo = document.getElementById("factura").files[0];

  if (!archivo) {
    alert("Debes adjuntar la factura.");
    return;
  }

  // Guardar texto original del botón y añadir spinner
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML = `<span class="spinner"></span> Enviando...`;
  submitButton.disabled = true;

  const reader = new FileReader();
  reader.readAsDataURL(archivo);
  reader.onload = async () => {
    const archivoBase64 = reader.result;

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwbaWGKRs7NA3RAeIpsSYt_lvAAqZeRxZ6LrZ2np35LoDngSryxKiYvFdT27phQbIQl/exec", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone,
          ciudad,
          departamento,
          sucursal,
          comentarios,
          archivo: archivoBase64,
          archivoNombre: archivo.name
        }),
        headers: { "Content-Type": "application/json" }
      });

      const result = await response.json();
      if (result.status === "success") {
        form.reset();
        modal.classList.add("active"); // Abrir modal al enviar correctamente
      } else {
        alert("❌ Ocurrió un error: " + result.message);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error al enviar los datos.");
    } finally {
      // Restaurar el botón
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  };
});

