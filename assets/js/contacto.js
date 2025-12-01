document.addEventListener('DOMContentLoaded', function () {
    const formContacto = document.getElementById('formContacto');
    const btnAbrirChat = document.getElementById('btnAbrirChat');
    const mensajeRespuesta = document.getElementById('mensajeRespuesta');

    // Función para validar el formulario 
    function validarFormulario() {
        let isValid = true;
        const nombre = document.getElementById('nombreContacto');
        const email = document.getElementById('emailContacto');
        const asunto = document.getElementById('asuntoContacto');
        const mensaje = document.getElementById('mensajeContacto');
        const terminos = document.getElementById('aceptaTerminos');

        // Limpiar mensajes de error previos
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        document.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');

        // Validaciones
        if (nombre && !nombre.value.trim()) {
            nombre.classList.add('is-invalid');
            document.getElementById('errorNombreContacto').textContent = 'Por favor, ingresa tu nombre.';
            isValid = false;
        }

        if (email && !email.value.trim()) {
            email.classList.add('is-invalid');
            document.getElementById('errorEmailContacto').textContent = 'Por favor, ingresa tu correo electrónico.';
            isValid = false;
        } else if (email && email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
             email.classList.add('is-invalid');
            document.getElementById('errorEmailContacto').textContent = 'Por favor, ingresa un correo electrónico válido.';
            isValid = false;
        }

        if (asunto && !asunto.value) {
            asunto.classList.add('is-invalid');
            document.getElementById('errorAsuntoContacto').textContent = 'Por favor, selecciona un asunto.';
            isValid = false;
        }

        if (mensaje && !mensaje.value.trim()) {
            mensaje.classList.add('is-invalid');
            document.getElementById('errorMensajeContacto').textContent = 'Por favor, escribe tu mensaje.';
            isValid = false;
        }

        if (terminos && !terminos.checked) {
            terminos.classList.add('is-invalid');
            document.getElementById('errorTerminos').textContent = 'Debes aceptar la política de privacidad.';
            isValid = false;
        }

        return isValid;
    }

    // Función para manejar el envío del formulario 
    if (formContacto) {
        formContacto.addEventListener('submit', function(e) {
            e.preventDefault();

            if (validarFormulario()) {
                // Simulación de Envío Exitoso (FAQ 10: Investigar e implementar)
                
                if (mensajeRespuesta) {
                    mensajeRespuesta.innerHTML = `
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <i class="bi bi-check-circle-fill"></i>
                            <strong>¡Mensaje Enviado!</strong> Hemos recibido tu consulta. Nos pondremos en contacto contigo a la brevedad.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    `;
                    // Limpiar el formulario
                    formContacto.reset();
                }
            }
        });
    }

    // Función para simular el chat en vivo 
    if (btnAbrirChat) {
        btnAbrirChat.addEventListener('click', function() {
            // Simulación de Chat (FAQ 10: Investigar e implementar) 
            alert("Simulación: Ventana de chat en vivo abierta.\n\n¡Hola! ¿En qué podemos ayudarte hoy?\n(Este es un mensaje simulado)");
        });
    }

    // Limpiar mensajes de error al escribir 
    const inputs = document.querySelectorAll('#formContacto input, #formContacto select, #formContacto textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                this.classList.remove('is-invalid');
                const errorId = `error${this.id.charAt(0).toUpperCase() + this.id.slice(1)}`;
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            }
        });
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