const productosData = [
    // Frutas Frescas
    {
        id: "FR001",
        nombre: "Manzanas Fuji",
        precio: 1200,
        categoria: "frutas",
        imagen: "../image/manzana-fuji.jpg",
        descripcion: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres."
    },
    {
        id: "FR002",
        nombre: "Naranjas Valencia",
        precio: 1000,
        categoria: "frutas",
        imagen: "../image/naranja-valencia.jpg",
        descripcion: "Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes."
    },
    {
        id: "FR003",
        nombre: "Plátanos Cavendish",
        precio: 800,
        categoria: "frutas",
        imagen: "../image/platano-cavendish.jpg",
        descripcion: "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Ricos en potasio y vitaminas."
    },
    // Verduras Orgánicas
    {
        id: "VR001",
        nombre: "Zanahorias Orgánicas",
        precio: 900,
        categoria: "verduras",
        imagen: "../image/zanahoria-organica.jpg",
        descripcion: "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A y fibra."
    },
    {
        id: "VR002",
        nombre: "Espinacas Frescas",
        precio: 700,
        categoria: "verduras",
        imagen: "../image/espinaca-fresca.webp",
        descripcion: "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Cultivadas bajo prácticas orgánicas."
    },
    {
        id: "VR003",
        nombre: "Pimentón - Varios Sabores",
        precio: 1500,
        categoria: "verduras",
        imagen: "../image/pimenton-colores.jpg",
        descripcion: "Pimentones rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas."
    },
    // Productos Orgánicos
    {
        id: "PO001",
        nombre: "Miel Orgánica",
        precio: 5000,
        categoria: "organicos",
        imagen: "../image/miel-organica.jpeg",
        descripcion: "Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable."
    },
    {
        id: "PO003",
        nombre: "Quinoa Orgánica",
        precio: 3500,
        categoria: "organicos",
        imagen: "../image/quinoa-organica.jpeg",
        descripcion: "Quinoa orgánica, un superalimento rico en proteínas y minerales, ideal para ensaladas y guarniciones."
    },
    // Productos Lácteos
    {
        id: "PL001",
        nombre: "Leche Entera",
        precio: 1100,
        categoria: "lacteos",
        imagen: "../image/leche-entera.jpeg",
        descripcion: "Leche entera fresca de granjas locales responsables. Rica en calcio y nutrientes esenciales."
    }
];

// Funcionalidad de la Página de Productos 
document.addEventListener('DOMContentLoaded', function () {
    const contenedorProductos = document.getElementById('contenedorProductos');
    const filtroCategoria = document.getElementById('filtroCategoria');
    const busquedaProducto = document.getElementById('busquedaProducto');
    const btnLimpiarFiltros = document.getElementById('btnLimpiarFiltros');

    if (!contenedorProductos || !filtroCategoria) {
        console.error("No se encontraron los elementos necesarios en productos.html");
        return;
    }

    // Función para renderizar productos
    function renderizarProductos(productosFiltrados) {
        contenedorProductos.innerHTML = '';

        if (productosFiltrados.length === 0) {
            contenedorProductos.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info text-center" role="alert">
                        <i class="bi bi-info-circle"></i> No se encontraron productos que coincidan con los filtros.
                    </div>
                </div>
            `;
            return;
        }

        productosFiltrados.forEach(producto => {
            const productoHTML = `
                <div class="col-md-4 mb-4 producto-item" data-categoria="${producto.categoria}" data-nombre="${producto.nombre.toLowerCase()}">
                    <div class="card product-card h-100">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text flex-grow-1">${producto.descripcion}</p>
                            <p class="card-text"><strong>$${producto.precio.toLocaleString('es-CL')} CLP</strong></p>
                            <button class="btn btn-success mt-auto agregar-carrito"
                                data-id="${producto.id}"
                                data-nombre="${producto.nombre}"
                                data-precio="${producto.precio}">
                                <i class="bi bi-cart-plus"></i> Agregar al Carrito
                            </button>
                            <a href="producto-detalle.html?id=${producto.id}" class="btn btn-outline-primary mt-2">
                                <i class="bi bi-eye"></i> Ver Detalles
                            </a>
                        </div>
                    </div>
                </div>
            `;
            contenedorProductos.innerHTML += productoHTML;
        });

        // Re-vincular eventos a los nuevos botones "Agregar al Carrito"
        document.querySelectorAll('.agregar-carrito').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.dataset.id;
                const nombre = this.dataset.nombre;
                const precio = parseFloat(this.dataset.precio);

                // Simular agregar al carrito (usando localStorage)
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
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
    }

    // Función para filtrar productos
    function filtrarProductos() {
        const categoriaSeleccionada = filtroCategoria.value;
        const terminoBusqueda = busquedaProducto.value.toLowerCase().trim();

        let productosFiltrados = productosData;

        // Filtrar por categoría
        if (categoriaSeleccionada !== 'todos') {
            productosFiltrados = productosFiltrados.filter(producto => producto.categoria === categoriaSeleccionada);
        }

        // Filtrar por búsqueda (nombre)
        if (terminoBusqueda !== '') {
            productosFiltrados = productosFiltrados.filter(producto =>
                producto.nombre.toLowerCase().includes(terminoBusqueda) ||
                producto.descripcion.toLowerCase().includes(terminoBusqueda)
            );
        }

        renderizarProductos(productosFiltrados);
    }

    // Función para limpiar filtros 
    function limpiarFiltros() {
        filtroCategoria.value = 'todos';
        busquedaProducto.value = '';
        renderizarProductos(productosData); // Mostrar todos los productos
    }

    // Event Listeners
    filtroCategoria.addEventListener('change', filtrarProductos);
    busquedaProducto.addEventListener('input', filtrarProductos); // Se filtra mientras se escribe
    if (btnLimpiarFiltros) {
        btnLimpiarFiltros.addEventListener('click', limpiarFiltros);
    }

    // Inicializar: Mostrar todos los productos al cargar la página
    renderizarProductos(productosData);

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