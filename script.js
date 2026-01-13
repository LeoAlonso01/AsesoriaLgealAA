// Toggle menú móvil
const btn = document.getElementById('mobile-menu-button');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// Simulación de envío de formulario (Opción AJAX Mejorada)
document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = this;
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.innerText;

    // UI: Estado de carga
    button.disabled = true;
    button.innerText = 'Enviando...';
    button.classList.add('opacity-75', 'cursor-not-allowed');

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Opción B: Mostrar mensaje en la misma página (AJAX)
            form.reset();
            form.classList.add('hidden');
            document.getElementById('success-msg').classList.remove('hidden');

            // Si prefieres la Opción A (Redirección), descomenta la siguiente línea y borra las anteriores de este bloque if:
            // window.location.href = 'gracias.html';
        } else {
            const data = await response.json();
            if (Object.hasOwn(data, 'errors')) {
                alert(data.errors.map(error => error.message).join(", "));
            } else {
                alert('Hubo un error al enviar el formulario.');
            }
        }
    } catch (error) {
        alert('Hubo un error de conexión. Por favor intente nuevamente.');
    } finally {
        // UI: Restaurar botón
        button.disabled = false;
        button.innerText = originalText;
        button.classList.remove('opacity-75', 'cursor-not-allowed');
    }
});

// Cerrar menú móvil al hacer click en enlace
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.add('hidden');
    });
});
