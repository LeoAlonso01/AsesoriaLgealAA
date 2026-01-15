// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBfUw91pJzMQk-RsILbPHTgbW2IMk_wwbE",
  authDomain: "asesorialegalaa-24537.firebaseapp.com",
  projectId: "asesorialegalaa-24537",
  storageBucket: "asesorialegalaa-24537.firebasestorage.app",
  messagingSenderId: "91602936008",
  appId: "1:91602936008:web:42e59f8e417b88199485fd",
  measurementId: "G-ZYJ5ZK90BN"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
console.log("✅ Firebase inicializado");

document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  try {
    // 1. Guardar en Firebase
    await db.collection('messages').add({
      ...data,
      _date: new Date(),
      status: 'new'
    });

    // 2. Enviar a Formspree (solicitar JSON para evitar redirección y error CORS)
    const response = await fetch(this.action, {
      method: 'POST',
      body: new URLSearchParams(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // ✅ Redirigir manualmente (evita CORS)
      window.location.href = 'gracias.html';
    } else {
      throw new Error('Formspree rechazó el envío');
    }

  } catch (err) {
    console.error('❌ Error:', err);
    alert('Hubo un problema. Por favor, inténtelo más tarde.');
  }
});



// === TOGGLE MENÚ MÓVIL ===
// === TOGGLE MENÚ MÓVIL ===
const btn = document.getElementById('mobile-menu-button');
const menu = document.getElementById('mobile-menu');
const iconMenu = document.getElementById('icon-menu');
const iconClose = document.getElementById('icon-close');

btn?.addEventListener('click', () => {
  menu?.classList.toggle('hidden');
  iconMenu?.classList.toggle('hidden');
  iconMenu?.classList.toggle('block');
  iconClose?.classList.toggle('hidden');
  iconClose?.classList.toggle('block');
});

// === CERRAR MENÚ AL HACER CLICK EN ENLACE ===
document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    menu?.classList.add('hidden');
    // Resetear iconos al estado inicial (Hamburguesa visible, X oculta)
    iconMenu?.classList.remove('hidden');
    iconMenu?.classList.add('block');
    iconClose?.classList.add('hidden');
    iconClose?.classList.remove('block');
  });
});

