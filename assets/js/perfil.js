document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formPerfil');
    const mensaje = document.getElementById('mensajePerfil');
    const nombreUsuarioSpan = document.getElementById('nombreUsuario');

    if (!form) return;

    function actualizarNombreUsuario() {
        const nombre = document.getElementById('nombrePerfil').value;
        if (nombreUsuarioSpan) {
            nombreUsuarioSpan.textContent = nombre;
        }
    }

    actualizarNombreUsuario();

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (mensaje) {
            mensaje.innerHTML = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <i class="bi bi-check-circle-fill"></i>
                    <strong>¡Perfecto!</strong> Tu información ha sido actualizada correctamente.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
        }

        actualizarNombreUsuario();
    });

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