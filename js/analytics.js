
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// Usa la misma configuración Firebase de tu proyecto.
const firebaseConfig = {
  apiKey: "AIzaSyCElQv2QRh_KrSSfMacVU7C_-aqCugigEU",
  authDomain: "orbix-admin-8b86c.firebaseapp.com",
  projectId: "orbix-admin-8b86c",
  storageBucket: "orbix-admin-8b86c.firebasestorage.app",
  messagingSenderId: "1080853705445",
  appId: "1:1080853705445:web:5bdbfac652d85d03779a0c",
  measurementId: "G-0764E0HSP4"
};

const app = initializeApp(firebaseConfig, "orbixLandingAnalytics");
const db = getFirestore(app);

async function registerEvent(type) {
  try {
    await addDoc(collection(db, "events"), {
      type,
      page: window.location.pathname,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    // No interrumpir el funcionamiento de la landing.
    console.error("No se pudo registrar el evento:", error.code);
  }
}

// Registrar una visita a la página.
registerEvent("page_view");

// Registrar clics en botones o enlaces de contacto y paquetes.

document.addEventListener("click", (event) => {
  const element = event.target.closest("a, button");

  if (!element) return;

  const href = element.getAttribute("href") || "";
  const label = (element.textContent || "").trim().toLowerCase();

  const isWhatsApp =
    /wa\.me|whatsapp\.com/i.test(href);

  const isPlan =
    element.hasAttribute("data-plan");

  const isContact =
    /contact|cotizar|contratar|solicitar|hablemos|whatsapp/i.test(label);

  if (isWhatsApp || isPlan || isContact) {
    registerEvent("cta_click");
  }
});

