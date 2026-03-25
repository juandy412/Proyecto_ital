
/**
 * PRINCIPAL.JS - Lógica principal del sitio
 * Maneja: Autenticación, carrito, animaciones, scroll
 * 
 * NOTA: Los componentes (header, nav, footer) ahora se cargan dinámicamente
 * desde el HTML usando AppShared.loadComponent()
 */

// Esperar a que los componentes estén listos
window.addEventListener("DOMContentLoaded", () => {
  initializePageLogic();
});

/**
 * Función principal de inicialización
 * Se ejecuta después de que los componentes están cargados
 */
async function initializePageLogic() {
  // Proteger páginas que requieren autenticación
  requireAuthForPage();
  
  // Configurar logística de página
  setupScrollTopButton();
  setupIntersectionObserver();
  updateCarritoCount();
  updateHeaderOffset();
  
  // Escuchar cambios en el almacenamiento
  window.addEventListener("storage", updateCarritoCount);
  window.addEventListener("resize", updateHeaderOffset);
  
  // Cargar datos dinámicos si existen
  setTimeout(() => {
    cargarProductos();
    actualizarBienvenida();
  }, 100);
}

/**
 * Verifica si una página requiere autenticación
 */
function requireAuthForPage() {
  const protectedPages = ["panel-estudiante.html"];
  let currentPage = window.location.pathname.split("/").pop();
  
  if (!currentPage || currentPage === "index.html") {
    currentPage = "inicio.html";
  }

  if (protectedPages.includes(currentPage) && !AppShared.isAuthenticated()) {
    const redirect = encodeURIComponent(currentPage);
    window.location.href = `../pages/login.html?redirect=${redirect}`;
  }
}

/**
 * Configura el botón "ir arriba"
 */
function setupScrollTopButton() {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (!scrollTopBtn) return;

  window.addEventListener("scroll", () => {
    scrollTopBtn.style.display = window.scrollY > 500 ? "flex" : "none";
  });

  scrollTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/**
 * Configura animaciones de entrada para secciones
 */
function setupIntersectionObserver() {
  try {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".fade-in-section").forEach(el => {
      observer.observe(el);
    });
  } catch (error) {
    console.error("Error configurando IntersectionObserver:", error);
  }
}

/**
 * Actualiza el contador del carrito
 */
function updateCarritoCount() {
  try {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartCount = document.querySelector(".cart-count");
    
    if (cartCount) {
      if (cart.length > 0) {
        cartCount.textContent = cart.length;
        cartCount.style.display = "inline-flex";
      } else {
        cartCount.style.display = "none";
      }
    }
  } catch (e) {
    console.error("Error actualizando contador del carrito:", e);
  }
}

/**
 * Actualiza la altura del header en CSS variable
 * Usado para fijar el contenido debajo del header sticky
 */
function updateHeaderOffset() {
  const header = document.querySelector(".site-header");
  if (header) {
    const height = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty("--header-height", `${height}px`);
  }
}

/**
 * Navega al carrito (con verificación de autenticación)
 */
window.irAlCarrito = function() {
  if (!AppShared.isAuthenticated()) {
    const redirect = encodeURIComponent("carrito.html");
    window.location.href = `../pages/login.html?redirect=${redirect}`;
    return;
  }
  window.location.href = "../pages/carrito.html";
};

/**
 * Carga productos desde JSON (si existe el contenedor)
 */
async function cargarProductos() {
  const contenedor = document.getElementById("productos-container");
  if (!contenedor) return; // No hay contenedor en esta página

  try {
    const response = await fetch("../data/products.json");
    if (!response.ok) throw new Error("Error al cargar productos");
    
    const productos = await response.json();

    const template = document.getElementById("producto-template");
    if (!template) {
      console.warn("Template 'producto-template' no encontrado");
      return;
    }

    productos.forEach(producto => {
      const clone = template.content.cloneNode(true);
      
      const titleEl = clone.querySelector(".prod-title");
      const priceEl = clone.querySelector(".prod-price");
      const descEl = clone.querySelector(".prod-desc");
      const imgEl = clone.querySelector(".prod-img");

      if (titleEl) titleEl.textContent = producto.name;
      if (priceEl) priceEl.textContent = AppShared.formatCurrency(producto.price);
      if (descEl) descEl.textContent = producto.description;
      if (imgEl) imgEl.src = producto.image;

      contenedor.appendChild(clone);
    });
  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}

/**
 * Actualiza el banner de bienvenida si el usuario está autenticado
 */
function actualizarBienvenida() {
  const userName = AppShared.getAuthUser();
  const banner = document.getElementById("welcomeBanner");
  const userNameSpan = document.getElementById("userName");

  if (userName && banner && userNameSpan) {
    userNameSpan.textContent = userName.user;
    banner.classList.add("active");
  }
}

// Hacer funciones globales accesibles
window.initializePageLogic = initializePageLogic;
window.updateCarritoCount = updateCarritoCount;

