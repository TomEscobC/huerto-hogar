document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formLogin");
    if (!form) return; // Salir si el formulario no existe

    const correoInput = document.getElementById("loginCorreo");
    const claveInput = document.getElementById("loginClave");
    const mensajeDiv = document.getElementById("mensajeLogin");

    // Limpiar mensajes de error al escribir
    [correoInput, claveInput].forEach(input => {
        if (input) {
            input.addEventListener("input", () => {
                input.classList.remove("is-invalid");
                const errorId = `error${input.id.charAt(0).toUpperCase() + input.id.slice(1)}`;
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            });
        }
    });

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let isValid = true;

        // Limpiar mensajes anteriores
        if (mensajeDiv) {
            mensajeDiv.innerHTML = '';
            mensajeDiv.className = 'mt-3';
        }

        // Obtener valores
        const correo = correoInput ? correoInput.value.trim() : '';
        const clave = claveInput ? claveInput.value : '';

        // Validaciones simples (FAQ 1: Simular login)
        if (correoInput && correo === "") {
            correoInput.classList.add("is-invalid");
            const errorElement = document.getElementById("errorLoginCorreo");
            if (errorElement) errorElement.textContent = "El correo es obligatorio.";
            isValid = false;
        }

        if (claveInput && clave === "") {
            claveInput.classList.add("is-invalid");
            const errorElement = document.getElementById("errorLoginClave");
            if (errorElement) errorElement.textContent = "La contraseña es obligatoria.";
            isValid = false;
        }

        if (isValid && mensajeDiv) {
            // Simulación de Login Exitoso (FAQ 1)
            mensajeDiv.className = 'alert alert-success mt-3 text-center';
            mensajeDiv.innerHTML = `
                <i class="bi bi-check-circle-fill"></i>
                <strong>¡Inicio de sesión exitoso!</strong> Bienvenido de nuevo.
            `;

            // Limpiar formulario
            form.reset();

            // Redirigir al perfil después de unos segundos (FAQ 2)
            setTimeout(() => {
                window.location.href = "perfil.html";
            }, 2000); // Redirige después de 2 segundos
        }
    });

    // Actualizar Contador del Carrito
    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        const contadorElement = document.getElementById('contadorCarrito');
        if (contadorElement) {
            contadorElement.textContent = totalItems;
        }
    }
    actualizarContadorCarrito();
});