import { db } from "./firebase-config.js";
import {
  collection, addDoc, getDocs, deleteDoc, doc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const form = document.getElementById("formCita");
const citasRef = collection(db, "citas");

let editando = false;
let idEditando = "";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const cita = {
    nombre: form.nombre.value,
    fechaHora: form.fechaHora.value,
    motivo: form.motivo.value,
    contacto: {
      email: form.email.value,
      telefono: form.telefono.value
    }
  };

  if (editando) {
    await updateDoc(doc(db, "citas", idEditando), cita);
    editando = false;
    idEditando = "";
    form.querySelector("button").textContent = "Guardar";
  } else {
    await addDoc(citasRef, cita);
  }

  form.reset();
  mostrarCitas();
});

async function mostrarCitas() {
  const contenedor = document.getElementById("listaCitas");
  contenedor.innerHTML = "";
  const snapshot = await getDocs(citasRef);
  snapshot.forEach(docu => {
    const data = docu.data();
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${data.nombre}</h3>
      <p><strong>Fecha y Hora:</strong> ${data.fechaHora}</p>
      <p><strong>Motivo:</strong> ${data.motivo}</p>
      <p><strong>Email:</strong> ${data.contacto.email}</p>
      <p><strong>Teléfono:</strong> ${data.contacto.telefono}</p>
      <button onclick="editarCita('${docu.id}', ${JSON.stringify(data).replace(/"/g, '&quot;')})">Editar</button>
      <button onclick="eliminarCita('${docu.id}')">Eliminar</button>
    `;
    contenedor.appendChild(div);
  });
}

window.editarCita = (id, datos) => {
  form.nombre.value = datos.nombre;
  form.fechaHora.value = datos.fechaHora;
  form.motivo.value = datos.motivo;
  form.email.value = datos.contacto.email;
  form.telefono.value = datos.contacto.telefono;
  editando = true;
  idEditando = id;
  form.querySelector("button").textContent = "Actualizar";
};

window.eliminarCita = async (id) => {
  await deleteDoc(doc(db, "citas", id));
  mostrarCitas();
};

mostrarCitas();
