const form = document.getElementById("registration-form");
const submitButton = form.querySelector("button[type='submit']");
const modal = document.getElementById("success-modal");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Mostrar "Enviando..." y deshabilitar botón
  const originalText = submitButton.textContent;
  submitButton.textContent = "Enviando...";
  submitButton.disabled = true;

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const ciudad = document.getElementById("ciudad").value.trim();
  const departamento = document.getElementById("departamento").value.trim();
  const sucursal = document.getElementById("sucursal").value.trim();
  const comentarios = document.getElementById("comentarios").value.trim();
  const cantidad = document.getElementById("cantidad").value.trim();
  const archivo = document.getElementById("factura").files[0];

  if (!archivo) {
    alert("Debes adjuntar la factura.");
    return;
  }

  // Convierte el archivo a base64
  const reader = new FileReader();
  reader.readAsDataURL(archivo);
  reader.onload = async () => {
    const archivoBase64 = reader.result;

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbx7IFa-WquIL6S-RsMCMG2ZJZBE4b4j5ebHHQqEvniMDBrnQUMgMfET-_bGD27qc35B/exec",
        {
          method: "POST",
          // 👇 Esta parte es CLAVE: evita que el navegador bloquee por CORS
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            ciudad,
            departamento,
            sucursal,
            comentarios,
            cantidad,
            archivo: archivoBase64,
            archivoNombre: archivo.name,
          }),
        }
      );

      // 👇 Cuando se usa no-cors, no podemos leer la respuesta, así que se asume éxito
      alert("✅ ¡Formulario enviado correctamente!");
      form.reset();

      // Restaurar el botón
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error al enviar los datos. Intenta nuevamente.");
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  };
});
