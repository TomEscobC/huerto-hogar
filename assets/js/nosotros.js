document.addEventListener('DOMContentLoaded', function () {
    // Inicializar el Mapa (si el elemento existe)
    const mapElement = document.getElementById('map');
    if (mapElement) {
        // Coordenadas aproximadas del centro de Chile para centrar el mapa
        const centerLat = -35.6751;
        const centerLng = -71.5430;
        
        // Crear el mapa
        const map = L.map('map').setView([centerLat, centerLng], 5); // Zoom 5 para ver todo Chile

        // Agregar capa de mapa base (OpenStreetMap)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Datos de las tiendas
        // Basado en el PDF. Se usan coordenadas aproximadas.
        const tiendas = [
            { nombre: "Santiago", lat: -33.4489, lng: -70.6693 },
            { nombre: "Puerto Montt", lat: -41.4657, lng: -72.9408 },
            { nombre: "Villarica", lat: -39.2833, lng: -72.2000 },
            { nombre: "Nacimiento", lat: -37.5000, lng: -72.6667 },
            { nombre: "Viña del Mar", lat: -33.0246, lng: -71.5518 },
            { nombre: "Valparaíso", lat: -33.0472, lng: -71.6127 },
            { nombre: "Concepción", lat: -36.8201, lng: -73.0481 },
            { nombre: "Temuco", lat: -38.7359, lng: -72.5904 }, // Asumida
            { nombre: "Antofagasta", lat: -23.6500, lng: -70.4000 } // Asumida
        ];

        // Agregar marcadores al mapa
        tiendas.forEach(tienda => {
            const marker = L.marker([tienda.lat, tienda.lng]).addTo(map);
            marker.bindPopup(`<b>${tienda.nombre}</b><br>Tienda HuertoHogar`).openPopup();
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
    } else {
        console.warn("Elemento #map no encontrado en nosotros.html. El mapa no se cargará.");
        // Aún así, actualizar el contador del carrito si estamos en la página
        function actualizarContadorCarrito() {
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
            const contadorElement = document.getElementById('contadorCarrito');
            if (contadorElement) {
                contadorElement.textContent = totalItems;
            }
        }
        actualizarContadorCarrito();
    }
});