import { db, storage } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

// Selecciona el formulario original por su ID
const form = document.getElementById("registration-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Obtiene los valores según los IDs originales de tu HTML
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const ciudad = document.getElementById("ciudad").value;
  const departamento = document.getElementById("departamento").value;
  const sucursal = document.getElementById("sucursal").value;
  const comentarios = document.getElementById("comentarios").value;
  const archivo = document.getElementById("factura").files[0];

  try {
    // 1️⃣ Subir imagen de la factura a Firebase Storage
    const storageRef = ref(storage, `facturas/${archivo.name}`);
    await uploadBytes(storageRef, archivo);
    const urlFactura = await getDownloadURL(storageRef);

    // 2️⃣ Guardar todos los datos en Firestore
    await addDoc(collection(db, "participantes"), {
      name,
      email,
      phone,
      ciudad,
      departamento,
      sucursal,
      comentarios,
      urlFactura,
      fecha: new Date()
    });

    alert("✅ ¡Formulario enviado correctamente!");
    form.reset();
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    alert("❌ Ocurrió un error al enviar los datos. Por favor, intenta nuevamente.");
  }
});
