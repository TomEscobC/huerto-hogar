# Configuración de Mockoon para Huerto Hogar

## ¿Qué es Mockoon?

Mockoon es una herramienta para simular APIs REST localmente sin necesidad de un backend real. Esto es perfecto para desarrollo y pruebas.

## Instalación de Mockoon

1. **Descargar Mockoon Desktop:**
   - Visita: https://mockoon.com/download/
   - Descarga la versión para tu sistema operativo (Windows, macOS, Linux)
   - Instala la aplicación

2. **Alternativa - Mockoon CLI (opcional):**
   ```bash
   npm install -g @mockoon/cli
   ```

## Cómo Usar la Configuración

### Opción 1: Importar en Mockoon Desktop (Recomendado)

1. Abre Mockoon Desktop
2. Click en "File" > "Open environment"
3. Selecciona el archivo `mockoon-config.json` de este proyecto
4. La configuración se cargará automáticamente

### Opción 2: Crear Manualmente

Si prefieres crear la configuración desde cero:

1. Abre Mockoon Desktop
2. Crea un nuevo environment
3. Configura:
   - **Nombre:** Huerto Hogar API
   - **Puerto:** 3001
   - **Prefix:** api
   - **CORS:** Habilitado

4. Crea las siguientes rutas:

#### Ruta 1: GET /api/products
- **Método:** GET
- **Endpoint:** products
- **Status:** 200
- **Body:** Array con todos los productos (ver mockoon-config.json)

#### Ruta 2: GET /api/products/:id
- **Método:** GET
- **Endpoint:** products/:id
- **Status:** 200
- **Body:** Objeto con un producto específico

## Iniciar el Servidor Mock

### Con Mockoon Desktop:
1. Abre Mockoon Desktop
2. Selecciona el environment "Huerto Hogar API"
3. Click en el botón verde "Start server" (▶️)
4. El servidor estará corriendo en http://localhost:3001

### Con Mockoon CLI:
```bash
mockoon-cli start --data mockoon-config.json
```

## Verificar que Funciona

Una vez iniciado el servidor, puedes probar los endpoints:

### En el navegador:
- http://localhost:3001/api/products (ver todos los productos)
- http://localhost:3001/api/products/FR001 (ver producto específico)

### Con curl:
```bash
# Ver todos los productos
curl http://localhost:3001/api/products

# Ver producto específico
curl http://localhost:3001/api/products/FR001
```

## Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/products | Obtiene todos los productos |
| GET | /api/products/:id | Obtiene un producto por ID |

### Productos Disponibles:
- FR001 - Manzanas Fuji
- VR001 - Zanahorias Orgánicas
- PO001 - Miel Orgánica
- PL001 - Leche Entera
- VR002 - Espinacas Frescas
- FR002 - Naranjas de Valencia
- PO002 - Pimentón de Colores

## Solución de Problemas

### Error: "Network Error" en la aplicación
- ✅ Verifica que Mockoon esté ejecutándose
- ✅ Verifica que el puerto sea 3001
- ✅ Verifica que CORS esté habilitado en Mockoon

### Error: "Port 3001 already in use"
- ✅ Cierra cualquier otra aplicación usando el puerto 3001
- ✅ O cambia el puerto en Mockoon y en `src/services/productService.ts`

### Los datos no se actualizan
- ✅ Reinicia el servidor de Mockoon
- ✅ Limpia la caché del navegador

## Notas Importantes

- **CORS está habilitado** por defecto en esta configuración
- El servidor debe estar **ejecutándose antes** de abrir el dashboard admin
- Si cambias el puerto en Mockoon, actualiza también `src/services/productService.ts`

## Ejecutar el Proyecto Completo

1. **Iniciar Mockoon:**
   ```bash
   # Abre Mockoon Desktop y inicia el servidor
   # O usa CLI:
   mockoon-cli start --data mockoon-config.json
   ```

2. **Iniciar React:**
   ```bash
   npm start
   ```

3. **Acceder al dashboard admin:**
   - http://localhost:3000/admin
   - http://localhost:3000/admin/products
   - http://localhost:3000/admin/products/FR001

4. **Acceder a la tienda:**
   - http://localhost:3000/
   - http://localhost:3000/products

## Para la Presentación

Asegúrate de:
1. ✅ Tener Mockoon ejecutándose en el puerto 3001
2. ✅ Tener el proyecto React ejecutándose en el puerto 3000
3. ✅ Demostrar los endpoints funcionando en Postman/navegador
4. ✅ Mostrar el dashboard admin consumiendo los datos de Mockoon
5. ✅ Explicar la estructura de las rutas y respuestas
