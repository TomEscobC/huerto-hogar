document.addEventListener('DOMContentLoaded', function () {
    const carritoContenido = document.getElementById('carritoContenido');

    if (!carritoContenido) {
        console.error("No se encontró el elemento #carritoContenido en carrito.html");
        return;
    }

    // --- Función para cargar y mostrar el carrito ---
    function cargarCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        // Limpiar el contenido del contenedor
        carritoContenido.innerHTML = '';

        if (carrito.length === 0) {
            // Carrito vacío
            carritoContenido.innerHTML = `
                <div class="alert alert-info text-center" role="alert">
                    <i class="bi bi-cart-x"></i> Tu carrito está vacío. 
                    <a href="productos.html" class="alert-link">¡Explora nuestros productos!</a>
                </div>
            `;
            // Asegurarse de que el contador del header también se actualice
            actualizarContadorCarrito();
            return;
        }

        // Calcular total
        let total = 0;
        let totalItems = 0;

        // Iniciar la estructura de la tabla del carrito
        let tablaHTML = `
        <div class="card">
            <div class="card-header bg-success text-white">
                <h5 class="mb-0"><i class="bi bi-list"></i> Resumen de Productos</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover align-middle">
                        <thead class="table-light">
                            <tr>
                                <th scope="col">Producto</th>
                                <th scope="col">Precio Unitario</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Subtotal</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        // Iterar por los productos en el carrito
        carrito.forEach((item, index) => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;
            totalItems += item.cantidad;

            tablaHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>$${item.precio.toLocaleString('es-CL')} CLP</td>
                <td>${item.cantidad}</td>
                <td><strong>$${subtotal.toLocaleString('es-CL')} CLP</strong></td>
                <td>
                    <button class="btn btn-danger btn-sm eliminar-item" data-index="${index}">
                        <i class="bi bi-trash"></i> Eliminar
                    </button>
                </td>
            </tr>
            `;
        });

        // Cerrar la tabla y mostrar el total
        tablaHTML += `
                        </tbody>
                    </table>
                </div> <!-- .table-responsive -->
                <hr>
                <div class="row justify-content-end">
                    <div class="col-md-4">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h5 class="mb-0">Total:</h5>
                            <h4 class="mb-0 text-success"><strong>$${total.toLocaleString('es-CL')} CLP</strong></h4>
                        </div>
                        <div class="d-grid gap-2">
                            <button id="btnVaciarCarrito" class="btn btn-outline-danger">
                                <i class="bi bi-cart-x"></i> Vaciar Carrito
                            </button>
                            <button id="btnProcederCompra" class="btn btn-success">
                                <i class="bi bi-credit-card"></i> Proceder al Pago
                            </button>
                        </div>
                    </div>
                </div> <!-- .row -->
            </div> <!-- .card-body -->
        </div> <!-- .card -->
        `;

        // Insertar el HTML generado en el contenedor
        carritoContenido.innerHTML = tablaHTML;

        // --- Vincular eventos a los nuevos botones ---
        document.querySelectorAll('.eliminar-item').forEach(button => {
            button.addEventListener('click', function () {
                const index = parseInt(this.dataset.index);
                eliminarDelCarrito(index);
            });
        });

        const btnVaciar = document.getElementById('btnVaciarCarrito');
        if (btnVaciar) {
            btnVaciar.addEventListener('click', vaciarCarrito);
        }

        const btnPagar = document.getElementById('btnProcederCompra');
        if (btnPagar) {
            btnPagar.addEventListener('click', procederAlPago);
        }

        // Actualizar el contador del carrito en el header
        actualizarContadorCarrito();
    }

    // --- Función para eliminar un item del carrito ---
    function eliminarDelCarrito(index) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        if (index >= 0 && index < carrito.length) {
            const nombreProducto = carrito[index].nombre;
            carrito.splice(index, 1); // Elimina 1 elemento en la posición 'index'
            localStorage.setItem('carrito', JSON.stringify(carrito));
            alert(`"${nombreProducto}" ha sido eliminado del carrito.`);
            cargarCarrito(); // Recargar la vista del carrito
        }
    }

    // --- Función para vaciar el carrito ---
    function vaciarCarrito() {
        if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
            localStorage.removeItem('carrito');
            cargarCarrito(); // Recargar la vista (mostrará mensaje de carrito vacío)
        }
    }

    // --- Función para proceder al pago ---
    function procederAlPago() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        if (carrito.length === 0) {
            alert("Tu carrito está vacío. Agrega productos antes de proceder al pago.");
            return;
        }
        // Simulación (FAQ 3): Mostrar total y mensaje
        const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        alert(`Simulación de Pago:\nTotal a pagar: $${total.toLocaleString('es-CL')} CLP\n\n¡Gracias por tu compra en HuertoHogar!`);
    }

    // --- Función para actualizar el contador del carrito en el header ---
    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        const contadorElement = document.getElementById('contadorCarrito');
        if (contadorElement) {
            contadorElement.textContent = totalItems;
        }
    }

    // --- Inicializar: Cargar el carrito al abrir la página ---
    cargarCarrito();
});