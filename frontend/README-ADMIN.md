# Dashboard AdminLTE - Huerto Hogar

## Descripción del Proyecto

Este proyecto integra un **dashboard de administración tipo AdminLTE** en la aplicación Huerto Hogar para gestionar productos de la tienda online. El dashboard permite:

✅ **Requisito 1:** Listar todos los productos registrados con filtros por categoría y búsqueda
✅ **Requisito 2:** Ver detalles completos de cada producto individual
✅ Dashboard con KPIs (Total productos, Categorías, Precio promedio)
✅ Integración con API REST simulada usando Mockoon
✅ Diseño profesional tipo AdminLTE
✅ TypeScript completo
✅ Separación de rutas (Tienda vs Admin)

---

## Estructura del Proyecto

```
frontend/
├── public/
│   └── index.html                    # HTML principal
├── src/
│   ├── admin/                        # 📁 Módulo Admin (NUEVO)
│   │   ├── layouts/
│   │   │   └── AdminLayout.tsx       # Layout principal del dashboard
│   │   ├── components/
│   │   │   ├── AdminNavbar.tsx       # Navbar superior
│   │   │   ├── AdminSidebar.tsx      # Sidebar de navegación
│   │   │   └── AdminFooter.tsx       # Footer del admin
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx         # Dashboard con KPIs
│   │   │   ├── ProductList.tsx       # ✅ REQUISITO 1: Lista de productos
│   │   │   └── ProductDetail.tsx     # ✅ REQUISITO 2: Detalle de producto
│   │   └── styles/
│   │       └── admin.css             # Estilos personalizados AdminLTE
│   ├── types/                        # 📁 Tipos TypeScript (NUEVO)
│   │   └── product.ts                # Interface Product
│   ├── services/                     # 📁 Servicios API (NUEVO)
│   │   └── productService.ts         # Servicio Axios para productos
│   ├── pages/                        # Páginas de la tienda (existentes)
│   │   ├── Home.tsx
│   │   ├── Products.tsx
│   │   └── ... (otras páginas)
│   ├── components/                   # Componentes de la tienda (existentes)
│   └── App.tsx                       # ✅ Router actualizado con rutas admin
├── mockoon-config.json               # 📁 Configuración Mockoon (NUEVO)
├── MOCKOON-README.md                 # 📁 Instrucciones Mockoon (NUEVO)
└── package.json
```

---

## Tecnologías Utilizadas

- **React 19.2.0** con TypeScript
- **React Router DOM 7.9.5** para enrutamiento
- **Bootstrap 5.3.8** para estilos
- **Bootstrap Icons 1.13.1** para iconografía
- **Axios 1.13.2** para peticiones HTTP
- **Mockoon** para simular API REST

---

## Instalación y Configuración

### 1. Instalar Dependencias

Todas las dependencias necesarias ya están en el `package.json`:

```bash
npm install
```

### 2. Configurar Mockoon

El proyecto incluye una configuración lista para usar. Sigue estos pasos:

#### Opción A: Mockoon Desktop (Recomendado)

1. **Descargar Mockoon:**
   - Visita: https://mockoon.com/download/
   - Descarga e instala Mockoon Desktop para tu sistema operativo

2. **Importar la configuración:**
   - Abre Mockoon Desktop
   - Click en "File" > "Open environment"
   - Selecciona el archivo `mockoon-config.json` del proyecto
   - Click en el botón verde "Start server" (▶️)

3. **Verificar que funciona:**
   - Abre en el navegador: http://localhost:3001/api/products
   - Deberías ver el array de productos en formato JSON

#### Opción B: Mockoon CLI

```bash
# Instalar Mockoon CLI globalmente
npm install -g @mockoon/cli

# Iniciar el servidor mock
mockoon-cli start --data mockoon-config.json
```

Para más detalles, consulta: **[MOCKOON-README.md](./MOCKOON-README.md)**

### 3. Iniciar el Proyecto React

```bash
npm start
```

El proyecto se abrirá en: http://localhost:3000

---

## Rutas Disponibles

### Rutas de la Tienda (Existentes)

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal |
| `/products` | Catálogo de productos |
| `/product/:id` | Detalle de producto |
| `/cart` | Carrito de compras |
| `/about` | Acerca de |
| `/contact` | Contacto |
| `/login` | Iniciar sesión |
| `/register` | Registro |

### Rutas del Dashboard Admin (NUEVAS)

| Ruta | Descripción | Requisito |
|------|-------------|-----------|
| `/admin` | Dashboard con KPIs | - |
| `/admin/products` | Lista de productos con filtros | ✅ Requisito 1 |
| `/admin/products/:id` | Detalle completo de producto | ✅ Requisito 2 |

---

## Funcionalidades del Dashboard

### 1. Dashboard Principal (`/admin`)

**Características:**
- 3 KPIs dinámicos:
  - Total de productos
  - Total de categorías
  - Precio promedio
- Tabla con los 5 productos más recientes
- Links rápidos a la gestión de productos
- Indicadores visuales con iconos de Bootstrap Icons

### 2. Lista de Productos (`/admin/products`) - ✅ REQUISITO 1

**Características:**
- Tabla completa con todos los productos
- Columnas: Imagen, ID, Nombre, Descripción, Categoría, Precio, Acciones
- **Filtros:**
  - Por categoría (frutas, verduras, orgánicos, lácteos)
  - Búsqueda por ID, nombre o descripción
  - Contador de resultados filtrados
- **Acciones:**
  - Ver detalles en el admin
  - Ver producto en la tienda (nueva pestaña)
- Breadcrumbs de navegación
- Diseño responsive

### 3. Detalle de Producto (`/admin/products/:id`) - ✅ REQUISITO 2

**Características:**
- Vista completa del producto con:
  - Imagen grande del producto
  - ID del producto (código SKU)
  - Nombre completo
  - Descripción completa
  - Categoría con badge de color
  - Precio formateado (CLP)
- Información adicional en cards:
  - SKU
  - Precio unitario
  - Categoría
- **Acciones:**
  - Volver al listado
  - Ver en la tienda (nueva pestaña)
- Breadcrumbs: Dashboard > Productos > {ID}

---

## Características Técnicas

### Separación de Rutas

El `App.tsx` implementa un sistema de rutas separadas:

```tsx
<Routes>
  {/* Rutas del Admin - Sin Header/Footer de la tienda */}
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="products" element={<ProductList />} />
    <Route path="products/:id" element={<ProductDetail />} />
  </Route>

  {/* Rutas de la Tienda - Con Header/Footer */}
  <Route path="*" element={<StoreLayout />}>
    {/* Rutas existentes */}
  </Route>
</Routes>
```

Esto garantiza que:
- ✅ El admin NO muestra el Header/Footer de la tienda
- ✅ El admin tiene su propio layout (sidebar, navbar, footer)
- ✅ Las rutas de la tienda siguen funcionando normalmente

### Servicio de API con Axios

El `productService.ts` centraliza todas las llamadas a la API:

```typescript
// Obtener todos los productos
const products = await getProducts();

// Obtener un producto por ID
const product = await getProductById('FR001');
```

**URL Base:** `http://localhost:3001/api`

### TypeScript

Todos los componentes usan TypeScript con tipos estrictos:

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}
```

### Estilos AdminLTE

El archivo `admin.css` incluye:
- Layout responsive con sidebar fijo
- Cards con sombras tipo AdminLTE
- Small boxes para KPIs
- Tablas con hover effect
- Badges para categorías
- Info boxes para datos adicionales

---

## Datos de Prueba

### Productos Disponibles en Mockoon

| ID | Nombre | Categoría | Precio |
|----|--------|-----------|--------|
| FR001 | Manzanas Fuji | frutas | $1,200 |
| VR001 | Zanahorias Orgánicas | verduras | $900 |
| PO001 | Miel Orgánica | organicos | $5,000 |
| PL001 | Leche Entera | lacteos | $1,100 |
| VR002 | Espinacas Frescas | verduras | $1,500 |
| FR002 | Naranjas de Valencia | frutas | $800 |
| PO002 | Pimentón de Colores | organicos | $2,000 |

---

## Cómo Ejecutar el Proyecto Completo

### Paso 1: Iniciar Mockoon

```bash
# Opción 1: Mockoon Desktop
# Abrir Mockoon Desktop y hacer click en "Start server"

# Opción 2: Mockoon CLI
mockoon-cli start --data mockoon-config.json
```

**Verificar:** http://localhost:3001/api/products debe retornar JSON con productos

### Paso 2: Iniciar React

```bash
npm start
```

**Se abrirá en:** http://localhost:3000

### Paso 3: Navegar al Dashboard Admin

1. Visita: http://localhost:3000/admin
2. Explora el dashboard con KPIs
3. Ve a "Productos" en el sidebar
4. Usa los filtros para buscar productos
5. Click en "Ver" para ver detalles de un producto

---

## Para la Presentación

### Demostración Sugerida

1. **Mostrar la estructura del proyecto:**
   - Explicar la separación de carpetas (admin, types, services)
   - Mostrar cómo se integró sin afectar la tienda existente

2. **Demostrar Mockoon:**
   - Abrir Mockoon Desktop
   - Mostrar los endpoints configurados
   - Probar en el navegador: http://localhost:3001/api/products

3. **Demostrar el Dashboard:**
   - Navegar a http://localhost:3000/admin
   - Explicar los KPIs dinámicos
   - Mostrar la tabla de productos recientes

4. **Demostrar Lista de Productos (Requisito 1):**
   - Navegar a http://localhost:3000/admin/products
   - Usar filtro por categoría (ej: frutas)
   - Usar búsqueda por texto (ej: "miel")
   - Explicar el contador de resultados

5. **Demostrar Detalle de Producto (Requisito 2):**
   - Click en "Ver" de un producto
   - Mostrar todos los detalles
   - Usar breadcrumbs para navegar
   - Click en "Ver en la tienda" para mostrar la separación

6. **Mostrar que la tienda sigue funcionando:**
   - Navegar a http://localhost:3000/
   - Mostrar que la tienda funciona normalmente
   - Explicar que admin y tienda son independientes

### Puntos Clave para Explicar

- ✅ **Integración AdminLTE:** Estilos profesionales sin usar la librería completa
- ✅ **TypeScript:** Todo el código nuevo está tipado
- ✅ **Mockoon:** API REST simulada para desarrollo
- ✅ **Axios:** Servicio centralizado para llamadas HTTP
- ✅ **Separación de rutas:** Admin y tienda completamente independientes
- ✅ **Requisitos cumplidos:** Lista y detalle de productos funcionando
- ✅ **Bootstrap Icons:** Iconografía moderna (ya instalado)
- ✅ **Código comentado:** Todos los componentes documentados en español

---

## Problemas Comunes

### Error: "Network Error" en el admin

**Causa:** Mockoon no está ejecutándose
**Solución:** Inicia Mockoon y verifica que esté en el puerto 3001

### Error: "Port 3001 already in use"

**Causa:** Otro proceso está usando el puerto 3001
**Solución:** Cierra el proceso o cambia el puerto en Mockoon y en `productService.ts`

### Los datos no se actualizan

**Causa:** Caché del navegador
**Solución:** Ctrl+Shift+R (Windows/Linux) o Cmd+Shift+R (Mac)

### Error de compilación TypeScript

**Causa:** Alguna dependencia no está instalada
**Solución:** Ejecuta `npm install` nuevamente

---

## Estructura de Archivos Creados/Modificados

### Archivos NUEVOS:

```
src/admin/                      # Módulo completo del admin
src/types/product.ts            # Tipos TypeScript
src/services/productService.ts  # Servicio API
mockoon-config.json             # Configuración Mockoon
MOCKOON-README.md              # Instrucciones Mockoon
README-ADMIN.md                # Este archivo
```

### Archivos MODIFICADOS:

```
src/App.tsx                     # Rutas del admin agregadas
public/index.html              # Título actualizado
tsconfig.json                  # downlevelIteration agregado
```

### Archivos SIN MODIFICAR:

```
src/pages/*                    # Páginas de la tienda intactas
src/components/*               # Componentes de la tienda intactos
```

---

## Criterios de Evaluación Cumplidos

| Criterio | Estado | Evidencia |
|----------|--------|-----------|
| Dashboard AdminLTE funcional | ✅ | `/admin` muestra KPIs y productos |
| Listar productos con filtros | ✅ | `/admin/products` con filtros por categoría y búsqueda |
| Ver detalle de producto | ✅ | `/admin/products/:id` muestra toda la info |
| Tienda original funcionando | ✅ | Todas las rutas `/`, `/products`, etc. intactas |
| Código TypeScript | ✅ | Todos los archivos nuevos son `.tsx` |
| Datos desde Mockoon | ✅ | `productService.ts` usa Axios + Mockoon |
| Diseño AdminLTE | ✅ | `admin.css` con estilos profesionales |
| Código comentado | ✅ | Comentarios en español en todos los archivos |
| Compila sin errores | ✅ | `npm run build` exitoso |

---

## Próximos Pasos (Opcional)

Si quieres extender el proyecto:

1. **CRUD completo:**
   - Agregar funcionalidad para crear productos
   - Agregar funcionalidad para editar productos
   - Agregar funcionalidad para eliminar productos

2. **Autenticación:**
   - Proteger rutas del admin con login
   - Implementar roles de usuario

3. **Gráficos:**
   - Agregar Chart.js para estadísticas
   - Dashboard con gráficos de ventas

4. **Paginación:**
   - Implementar paginación en la lista de productos

5. **Backend real:**
   - Reemplazar Mockoon con Node.js + Express
   - Conectar a base de datos MongoDB/PostgreSQL

---

## Recursos Adicionales

- **AdminLTE:** https://adminlte.io/
- **Mockoon:** https://mockoon.com/
- **React Router:** https://reactrouter.com/
- **Bootstrap 5:** https://getbootstrap.com/
- **Bootstrap Icons:** https://icons.getbootstrap.com/
- **Axios:** https://axios-http.com/

---

## Autor

Dashboard desarrollado para el proyecto **Huerto Hogar**
Fecha: Diciembre 2025

¡Buena suerte con tu presentación! 🚀
