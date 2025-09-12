// assets/js/registro.js

// --- Funciones de Validación ---
function validarRun(run) {
    // Expresión regular mejorada basada en el PDF (8 dígitos + 1 dígito verificador)
    // Acepta RUN con o sin puntos y guión, y con K mayúscula o minúscula
    const regex = /^(\d{1,2}\.?)(\d{3}\.?)(\d{3})-?([\dkK])$/;
    if (!regex.test(run)) {
        return false;
    }
    // Extraer solo los números y el dígito verificador para la validación matemática
    const cleanRun = run.replace(/\./g, '').replace('-', '');
    const rutSinDigito = cleanRun.slice(0, -1);
    const rutDigito = cleanRun.slice(-1).toUpperCase();

    if (rutSinDigito.length < 7) return false; // RUN demasiado corto

    let suma = 0;
    let mul = 2;

    for (let i = rutSinDigito.length - 1; i >= 0; i--) {
        suma += parseInt(rutSinDigito.charAt(i)) * mul;
        mul = mul < 7 ? mul + 1 : 2;
    }

    const resultado = 11 - (suma % 11);
    let dvCalculado;
    if (resultado === 11) dvCalculado = '0';
    else if (resultado === 10) dvCalculado = 'K';
    else dvCalculado = resultado.toString();

    return dvCalculado === rutDigito;
}

function validarCorreo(correo) {
    // Basado en FAQ 1 y PDF
    return /^[\w.+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(correo);
}

function esMayorEdad(fechaString) {
    const hoy = new Date();
    const fechaNac = new Date(fechaString);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }
    return edad >= 18;
}

// --- Lógica Principal del Formulario ---
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formRegistro");
    if (!form) return; // Salir si el formulario no existe en la página

    const runInput = document.getElementById("run");
    const nombreInput = document.getElementById("nombre");
    const correoInput = document.getElementById("correo");
    const claveInput = document.getElementById("clave");
    const fechaInput = document.getElementById("fechaNacimiento");
    const mensajeDiv = document.getElementById("mensaje");

    // Limpiar mensajes de error al escribir
    [runInput, nombreInput, correoInput, claveInput, fechaInput].forEach(input => {
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
            mensajeDiv.className = 'mt-3'; // Reset classes
        }

        // Obtener valores
        const run = runInput ? runInput.value.trim() : '';
        const nombre = nombreInput ? nombreInput.value.trim() : '';
        const correo = correoInput ? correoInput.value.trim() : '';
        const clave = claveInput ? claveInput.value : '';
        const fecha = fechaInput ? fechaInput.value : '';

        // Validaciones
        if (runInput && !validarRun(run)) {
            runInput.classList.add("is-invalid");
            const errorElement = document.getElementById("errorRun");
            if (errorElement) errorElement.textContent = "RUN inválido. Debe tener 8 dígitos seguidos de un dígito verificador (número o K).";
            isValid = false;
        }

        if (nombreInput && nombre === "") {
            nombreInput.classList.add("is-invalid");
            const errorElement = document.getElementById("errorNombre");
            if (errorElement) errorElement.textContent = "El nombre es obligatorio.";
            isValid = false;
        }

        if (correoInput && !validarCorreo(correo)) {
            correoInput.classList.add("is-invalid");
            const errorElement = document.getElementById("errorCorreo");
            if (errorElement) errorElement.textContent = "Correo no válido. Debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com";
            isValid = false;
        }

        if (claveInput && (clave.length < 4 || clave.length > 10)) {
            claveInput.classList.add("is-invalid");
            const errorElement = document.getElementById("errorClave");
            if (errorElement) errorElement.textContent = "La clave debe tener entre 4 y 10 caracteres.";
            isValid = false;
        }

        if (fechaInput && !fecha) {
            fechaInput.classList.add("is-invalid");
            const errorElement = document.getElementById("errorFecha");
            if (errorElement) errorElement.textContent = "La fecha es obligatoria.";
            isValid = false;
        } else if (fechaInput && fecha && !esMayorEdad(fecha)) {
            fechaInput.classList.add("is-invalid");
            const errorElement = document.getElementById("errorFecha");
            if (errorElement) errorElement.textContent = "Debes ser mayor de 18 años.";
            isValid = false;
        }

        if (isValid && mensajeDiv) {
            // --- Simulación de Registro Exitoso ---
            mensajeDiv.className = 'alert alert-success mt-3 text-center';
            mensajeDiv.textContent = `¡Registro exitoso! Bienvenido(a), ${nombre}.`;

            // --- Mostrar Descuentos según FAQ ---
            if (correo.toLowerCase().endsWith('@duoc.cl') || correo.toLowerCase().endsWith('@profesor.duoc.cl')) {
                const alertaDuoc = document.createElement('div');
                alertaDuoc.className = 'alert alert-warning mt-3';
                alertaDuoc.innerHTML = '<i class="bi bi-gift"></i> <strong>¡Felicidades!</strong> Te has registrado con correo Duoc, tienes un 20% de descuento.';
                mensajeDiv.parentNode.insertBefore(alertaDuoc, mensajeDiv.nextSibling);
            }
            
            // Mostrar código FELICES50 (FAQ 11)
            const alertaFelices50 = document.createElement('div');
            alertaFelices50.className = 'alert alert-warning mt-3';
            alertaFelices50.innerHTML = '<i class="bi bi-ticket-perforated"></i> <strong>¡Código de Descuento!</strong> Tienes un descuento del 10% de por vida con el siguiente código: <strong>FELICES50</strong>';
            // Insertar después del descuento DUOC o después del mensaje de éxito
            const referencia = document.querySelector('.alert-warning') || mensajeDiv;
            referencia.parentNode.insertBefore(alertaFelices50, referencia.nextSibling);

            // Limpiar formulario
            form.reset();
        }
    });

    // --- Actualizar Contador del Carrito ---
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

// --- Función para limpiar el formulario (Añadida) ---
function limpiarFormulario() {
    const form = document.getElementById('formRegistro');
    if (form) {
        // Resetea todos los campos del formulario
        form.reset();
        
        // Limpia mensajes de error visuales
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        document.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');
        
        // Limpia el mensaje general de éxito/advertencia
        const mensajeDiv = document.getElementById('mensaje');
        if (mensajeDiv) {
            mensajeDiv.innerHTML = '';
            mensajeDiv.className = 'mt-3';
        }
    }
}