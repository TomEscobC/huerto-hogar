const productosData = [
    // Frutas Frescas
    {
        id: "FR001",
        nombre: "Manzanas Fuji",
        precio: 1200,
        categoria: "frutas",
        imagen: "../image/manzana-fuji.jpg",
        descripcion: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres.",
        stock: 150 // Información adicional del PDF
    },
    {
        id: "FR002",
        nombre: "Naranjas Valencia",
        precio: 1000,
        categoria: "frutas",
        imagen: "../image/naranja-valencia.jpg",
        descripcion: "Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes.",
        stock: 200
    },
    {
        id: "FR003",
        nombre: "Plátanos Cavendish",
        precio: 800,
        categoria: "frutas",
        imagen: "../image/platano-cavendish.jpg",
        descripcion: "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Ricos en potasio y vitaminas.",
        stock: 250
    },
    // Verduras Orgánicas
    {
        id: "VR001",
        nombre: "Zanahorias Orgánicas",
        precio: 900,
        categoria: "verduras",
        imagen: "../image/zanahoria-organica.jp",
        descripcion: "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A y fibra.",
        stock: 100
    },
    {
        id: "VR002",
        nombre: "Espinacas Frescas",
        precio: 700, // Precio por bolsa de 500g
        categoria: "verduras",
        imagen: "../image/espinaca-fresca.webp",
        descripcion: "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Cultivadas bajo prácticas orgánicas.",
        stock: 80
    },
    {
        id: "VR003",
        nombre: "Pimentón - Varios Sabores",
        precio: 1500,
        categoria: "verduras",
        imagen: "../image/pimenton-colores.jpg",
        descripcion: "Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas.",
        stock: 120
    },
    // Productos Orgánicos
    {
        id: "PO001",
        nombre: "Miel Orgánica",
        precio: 5000, // Precio por frasco de 500g
        categoria: "organicos",
        imagen: "../image/miel-organica.jpeg",
        descripcion: "Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable.",
        stock: 50
    },
    {
        id: "PO003", // Asumiendo que PO002 se salta
        nombre: "Quinoa Orgánica",
        precio: 3500, // Precio estimado por 500g
        categoria: "organicos",
        imagen: "../image/quinoa-organica.jpeg",
        descripcion: "Quinoa orgánica, un superalimento rico en proteínas y minerales, ideal para ensaladas y guarniciones.",
        stock: 0 // Ejemplo de producto sin stock
    },
    // Productos Lácteos
    {
        id: "PL001",
        nombre: "Leche Entera",
        precio: 1100, // Precio por litro
        categoria: "lacteos",
        imagen: "../image/leche-entera.jpeg",
        descripcion: "Leche entera fresca de granjas locales responsables. Rica en calcio y nutrientes esenciales.",
        stock: "Disponible" // Ejemplo de texto para stock
    }
];

document.addEventListener('DOMContentLoaded', function () {
    const detalleProducto = document.getElementById('detalleProducto');
    const formResena = document.getElementById('formResena');
    const textoResena = document.getElementById('textoResena');
    const contenedorResenas = document.getElementById('contenedorResenas');
    const errorResena = document.getElementById('errorResena');

    if (!detalleProducto || !contenedorResenas) {
        console.error("No se encontraron los elementos necesarios en producto-detalle.html");
        return;
    }

    // Obtener el ID del producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = urlParams.get('id');

    if (!productoId) {
        detalleProducto.innerHTML = `
            <div class="alert alert-danger text-center" role="alert">
                <i class="bi bi-exclamation-triangle"></i> Error: No se especificó un producto.
            </div>
        `;
        return;
    }

    // Buscar el producto por ID
    const producto = productosData.find(p => p.id === productoId);

    if (!producto) {
        detalleProducto.innerHTML = `
            <div class="alert alert-warning text-center" role="alert">
                <i class="bi bi-search"></i> Producto no encontrado.
            </div>
        `;
        return;
    }

    // Renderizar los detalles del producto 
    function renderizarDetalleProducto() {
        const stockInfo = typeof producto.stock === 'number' ? `${producto.stock} unidades disponibles` : producto.stock;
        const stockClass = typeof producto.stock === 'number' && producto.stock > 0 ? 'text-success' : (typeof producto.stock === 'number' && producto.stock === 0 ? 'text-danger' : 'text-warning');
        const stockText = typeof producto.stock === 'number' && producto.stock === 0 ? 'Agotado' : stockInfo;

        detalleProducto.innerHTML = `
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="../../index.html">Inicio</a></li>
                <li class="breadcrumb-item"><a href="productos.html">Productos</a></li>
                <li class="breadcrumb-item active" aria-current="page">${producto.nombre}</li>
            </ol>
        </nav>

        <div class="row g-4">
            <div class="col-md-6">
                <img src="${producto.imagen}" class="img-fluid rounded shadow" alt="${producto.nombre}">
            </div>
            <div class="col-md-6">
                <h1 class="display-6">${producto.nombre}</h1>
                <p class="lead">${producto.descripcion}</p>
                <ul class="list-unstyled">
                    <li><strong>ID:</strong> ${producto.id}</li>
                    <li><strong>Categoría:</strong> <span class="badge bg-secondary">${producto.categoria}</span></li>
                    <li><strong>Stock:</strong> <span class="${stockClass}">${stockText}</span></li>
                </ul>
                <h3 class="text-success mb-3">$${producto.precio.toLocaleString('es-CL')} CLP</h3>
                <button id="btnAgregarCarrito" class="btn btn-success btn-lg" 
                    data-id="${producto.id}" 
                    data-nombre="${producto.nombre}" 
                    data-precio="${producto.precio}"
                    ${typeof producto.stock === 'number' && producto.stock === 0 ? 'disabled' : ''}>
                    <i class="bi bi-cart-plus"></i> Agregar al Carrito
                </button>
                <a href="productos.html" class="btn btn-outline-secondary ms-2"><i class="bi bi-arrow-left"></i> Volver a Productos</a>
            </div>
        </div>
        `;

        // Vincular evento al botón de agregar al carrito
        const btnAgregar = document.getElementById('btnAgregarCarrito');
        if (btnAgregar && !(typeof producto.stock === 'number' && producto.stock === 0)) {
            btnAgregar.addEventListener('click', function() {
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
        }
    }

    // Función para cargar y mostrar reseñas 
    function cargarResenas() {
        // Obtener reseñas del localStorage usando una clave única por producto
        const claveResenas = `resenas_${productoId}`;
        const resenas = JSON.parse(localStorage.getItem(claveResenas)) || [];

        contenedorResenas.innerHTML = ''; // Limpiar contenedor

        if (resenas.length === 0) {
            contenedorResenas.innerHTML = `
                <div class="alert alert-info" role="alert">
                    <i class="bi bi-info-circle"></i> Aún no hay reseñas para este producto. ¡Sé el primero en dejar una!
                </div>
            `;
            return;
        }

        // Mostrar las reseñas (FAQ 9)
        resenas.forEach(texto => {
            const resenaHTML = `
                <div class="card mb-3 shadow-sm">
                    <div class="card-body">
                        <p class="card-text">${texto}</p>
                        <footer class="blockquote-footer">Usuario Anónimo</footer>
                    </div>
                </div>
            `;
            contenedorResenas.innerHTML += resenaHTML;
        });
    }

    // Función para manejar el envío de una nueva reseña 
    if (formResena) {
        formResena.addEventListener('submit', function(e) {
            e.preventDefault();

            const texto = textoResena.value.trim();

            // Limpiar mensaje de error
            textoResena.classList.remove('is-invalid');
            if (errorResena) errorResena.textContent = '';

            if (texto === '') {
                textoResena.classList.add('is-invalid');
                if (errorResena) errorResena.textContent = 'Por favor, escribe tu reseña.';
                return;
            }

            // Guardar reseña en localStorage (FAQ 4, 9)
            const claveResenas = `resenas_${productoId}`;
            let resenas = JSON.parse(localStorage.getItem(claveResenas)) || [];
            resenas.push(texto);
            localStorage.setItem(claveResenas, JSON.stringify(resenas));

            // Limpiar el formulario
            formResena.reset();

            // Mostrar mensaje de éxito (opcional)
            alert('¡Gracias por tu reseña!');

            // Recargar las reseñas
            cargarResenas();
        });
    }

    // Función para actualizar el contador del carrito 
    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        const contadorElement = document.getElementById('contadorCarrito');
        if (contadorElement) {
            contadorElement.textContent = totalItems;
        }
    }

    // Inicializar la página
    renderizarDetalleProducto();
    cargarResenas();
    actualizarContadorCarrito();
});