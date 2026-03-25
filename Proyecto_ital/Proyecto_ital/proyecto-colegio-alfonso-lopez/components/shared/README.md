# 📦 Componentes Modulares - Estructura del Proyecto

## Descripción

Esta carpeta contiene todos los componentes del proyecto organizados de forma **modular y reutilizable**. Cada componente tiene su propia carpeta con archivos HTML, CSS y JavaScript independientes.

## 📁 Estructura

```
components/
├── shared/
│   ├── shared.css          # Variables y estilos globales
│   ├── shared.js           # Funciones compartidas
│   └── README.md           # Este archivo
├── header/
│   ├── header.html         # Estructura HTML del encabezado
│   ├── header.css          # Estilos del encabezado
│   └── header.js           # Funcionalidad (autenticación, logout)
├── navigation/
│   ├── navigation.html     # Estructura HTML de la navegación
│   ├── navigation.css      # Estilos de la navegación
│   └── navigation.js       # Funcionalidad (active links, autenticación)
├── footer/
│   ├── footer.html         # Estructura HTML del pie de página
│   ├── footer.css          # Estilos del pie de página
│   └── footer.js           # Funcionalidad (año dinámico)
└── product-card/
    ├── product-card.html   # Ejemplo de uso del Web Component
    ├── product-card.css    # Estilos del Web Component
    └── product-card.js     # Clase del Web Component

```

## 🎯 Componentes

### 1. Header (Encabezado)
Muestra el logo, título y funciones de usuario (login/logout, portal académico, carrito).

**Atributos:**
- Logo y nombre de la institución
- Área de usuario (muestra nombre si está autenticado)
- Botón de Portal Académico
- Botón de Logout
- Carrito de compras

**Archivos:**
- `header.html` - Estructura
- `header.css` - Sistema de estilos responsive
- `header.js` - Gestión de autenticación y UI

---

### 2. Navigation (Navegación)
Barra de navegación principal con enlaces a todas las páginas.

**Características:**
- Links activos según página actual
- Ocultamiento del link "Login" si está autenticado
- Sistema de navegación responsive
- Estilos animados en hover

**Archivos:**
- `navigation.html` - Lista de navegación
- `navigation.css` - Estilos y animaciones
- `navigation.js` - Lógica de links activos

---

### 3. Footer (Pie de Página)
Pie de página con información legal y año dinámico.

**Características:**
- Año automático (se actualiza cada año)
- Diseño oscuro con buen contraste
- Links informativos (futuros)

**Archivos:**
- `footer.html` - Estructura
- `footer.css` - Estilos
- `footer.js` - Año dinámico

---

### 4. Product Card (Web Component)
Componente reutilizable para mostrar tarjetas de productos.

**Atributos:**
- `name` - Nombre del producto
- `price` - Precio del producto
- `description` - Descripción
- `image` - URL de la imagen

**Evento:**
- `product-buy` - Se dispara cuando se hace clic en "Comprar"

**Ejemplo de uso:**
```html
<product-card
  name="Técnica en Sistemas"
  price="5000000"
  description="Formación en programación y desarrollo empresarial"
  image="/ruta/imagen.jpg">
</product-card>
```

**Archivos:**
- `product-card.html` - Ejemplo de uso
- `product-card.css` - Estilos (dentro del Shadow DOM)
- `product-card.js` - Clase del Web Component

---

### 5. Shared (Compartido)
Variables globales y funciones compartidas.

**Variables CSS:**
- `--primary` - Color principal (#4CAF50 verde ITAL)
- `--green-dark` - Verde oscuro (#388E3C)
- `--secondary` - Amarillo/Ámbar (#FFC107)
- `--white`, `--black`, `--text-dark`, etc.

**Funciones JavaScript:**
- `loadComponent(url, elementId)` - Carga un componente HTML
- `isAuthenticated()` - Verifica si está autenticado
- `getAuthUser()` - Obtiene datos del usuario
- `requireAuth()` - Requiere autenticación
- `logout()` - Cierra la sesión
- `formatCurrency()` - Formatea números como moneda
- `getQueryParam()` - Obtiene parámetros de URL
- `scrollToElement()` - Scroll suave a elemento
- `AppEvents` - Event dispatcher global

**Archivos:**
- `shared.css` - Variables y estilos globales
- `shared.js` - Funciones compartidas

---

## 🚀 Cómo Usar los Componentes

### Cargar componentes en una página

En el archivo HTML de tu página, carga los componentes así:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Estilos compartidos -->
  <link rel="stylesheet" href="../components/shared/shared.css">
  
  <!-- Estilos de componentes individuales -->
  <link rel="stylesheet" href="../components/header/header.css">
  <link rel="stylesheet" href="../components/navigation/navigation.css">
  <link rel="stylesheet" href="../components/footer/footer.css">
  <link rel="stylesheet" href="../components/product-card/product-card.css">
</head>
<body>
  <!-- Espacios para los componentes -->
  <div id="encabezado"></div>
  <div id="navegacion"></div>
  
  <main>
    <!-- Contenido de la página aquí -->
  </main>
  
  <div id="pie-pagina"></div>

  <!-- Scripts compartidos primero -->
  <script src="../components/shared/shared.js"></script>
  
  <!-- Luego los componentes -->
  <script src="../components/header/header.js"></script>
  <script src="../components/navigation/navigation.js"></script>
  <script src="../components/footer/footer.js"></script>
  <script src="../components/product-card/product-card.js"></script>
  
  <!-- Tu script principal -->
  <script>
    // Cargar componentes
    AppShared.loadComponent("../components/header/header.html", "encabezado");
    AppShared.loadComponent("../components/navigation/navigation.html", "navegacion");
    AppShared.loadComponent("../components/footer/footer.html", "pie-pagina");
  </script>
</body>
</html>
```

### Usar el Web Component Product Card

```html
<project-card
  name="Mi Producto"
  price="25000"
  description="Una descripción interesante"
  image="./images/mi-imagen.jpg">
</product-card>

<script>
  document.addEventListener("product-buy", (e) => {
    console.log("Producto comprado:", e.detail);
  });
</script>
```

### Usar funciones compartidas

```javascript
// Verificar autenticación
if (AppShared.isAuthenticated()) {
  const user = AppShared.getAuthUser();
  console.log("Usuario:", user.user);
}

// Formatear moneda
const precio = AppShared.formatCurrency(50000);
console.log(precio); // COP 50.000

// Obtener parámetro de URL
const redirect = AppShared.getQueryParam("redirect");

// Event dispatcher personalizdo
AppShared.AppEvents.emit("miEvento", { datos: "ejemplo" });
AppShared.AppEvents.on("miEvento", (data) => {
  console.log("Evento recibido:", data);
});
```

---

## 📱 Diseño Responsive

Todos los componentes incluyen breakpoints para:
- 📱 Móviles (≤ 480px)
- 📱 Tablets (≤ 768px)
- 💻 Laptops (≤ 1200px)
- 🖥️ Escritorio (> 1200px)

---

## 🎨 Personalización

### Cambiar colores primarios
Edita `/components/shared/shared.css` y modifica las variables:

```css
:root {
  --primary: #4CAF50;      /* Tu color aquí */
  --green-dark: #388E3C;
  --secondary: #FFC107;
}
```

### Agregar un nuevo componente

1. Crea una nueva carpeta: `components/mi-componente/`
2. Crea tres archivos:
   - `mi-componente.html` - Estructura
   - `mi-componente.css` - Estilos
   - `mi-componente.js` - Funcionalidad
3. Importa en tu página HTML
4. Carga con `AppShared.loadComponent()` o ejecuta el JS directamente

---

## ⚙️ Buenas Prácticas

✅ **Haz:**
- Mantener cada componente independiente
- Usar funciones del `AppShared`
- Importar solo los CSS que necesites
- Documentar cambios importantes

❌ **Evita:**
- Estilos en línea en HTML
- Nombres genéricos para clases
- Mezclar estilos de componentes diferentes
- Dependencias circulares entre componentes

---

## 📝 Notas de Desarrollo

- Los estilos están **encapsulados** en cada componente
- El Header y Navigation comparten funcionalidad de autenticación
- El Footer actualiza el año automáticamente
- El Product Card usa **Shadow DOM** para aislamiento completo

---

**Última actualización:** 25 de Marzo de 2026
