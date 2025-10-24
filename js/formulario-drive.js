const form = document.getElementById("registration-form");

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

  const reader = new FileReader();
  reader.readAsDataURL(archivo);
  reader.onload = async () => {
    const archivoBase64 = reader.result;

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwRxztbaNiTY9gj40IDeIu4M8pS8CJ60aeUEkZHf2iCesaROgbuCm6iEXtEorX_u5F9/exec", {  // Pega acá la URL del Apps Script
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
        headers: {
          "Content-Type": "application/json"
        }
      });

      const result = await response.json();
      if (result.status === "success") {
        alert("✅ ¡Formulario enviado correctamente!");
        form.reset();
      } else {
        alert("❌ Ocurrió un error: " + result.message);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error al enviar los datos.");
    }
  };
});
