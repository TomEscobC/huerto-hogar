//  Funcionalidad del Carrito 
document.addEventListener('DOMContentLoaded', function () {
    //  1. Agregar al Carrito 
    document.querySelectorAll('.agregar-carrito').forEach(button => {
        button.addEventListener('click', function() {
            const nombre = this.dataset.nombre;
            const precio = parseFloat(this.dataset.precio);
            const id = this.dataset.id;

            // Simular agregar al carrito (usando localStorage)
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            // Verificar si el producto ya está en el carrito
            const productoExistente = carrito.find(item => item.id === id);
            if (productoExistente) {
                productoExistente.cantidad += 1;
            } else {
                carrito.push({id: id, nombre: nombre, precio: precio, cantidad: 1});
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));

            // Actualizar el contador en el header
            actualizarContadorCarrito();

            alert(`"${nombre}" ha sido agregado al carrito.`);
        });
    });

    // 2. Actualizar Contador del Carrito
    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        const contadorElement = document.getElementById('contadorCarrito');
        if (contadorElement) {
            contadorElement.textContent = totalItems;
        }
    }
    // Llamar al cargar la página para reflejar el estado actual del carrito
    actualizarContadorCarrito();

    // 3. Funcionalidad de Filtros 
    const filtroSelect = document.getElementById('filtroCategoriaIndex');
    const productos = document.querySelectorAll('.producto-item');

    if (filtroSelect) {
        filtroSelect.addEventListener('change', function() {
            const categoriaSeleccionada = this.value;

            productos.forEach(producto => {
                if (categoriaSeleccionada === 'todos' || producto.dataset.categoria === categoriaSeleccionada) {
                    producto.style.display = 'block'; // Mostrar
                } else {
                    producto.style.display = 'none'; // Ocultar
                }
            });
        });
    }
});