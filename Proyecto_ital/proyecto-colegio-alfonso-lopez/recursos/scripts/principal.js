// ============================================================================
// Script Principal - Gestión de estructura, autenticación y componentes
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {

  // =========================================================================
  // 1. AUTENTICACIÓN (Login simple - fines educativos)
  // =========================================================================

  function isAuthenticated() {
    try {
      const auth = sessionStorage.getItem("authUser");
      return !!(auth && JSON.parse(auth).user);
    } catch (e) {
      return false;
    }
  }

  function requireAuthForPage() {
    const protectedPages = [
      "panel-estudiante.html"
    ];
    let currentPage = window.location.pathname.split("/").pop();
    if (!currentPage || currentPage === "index.html") {
      currentPage = "inicio.html";
    }

    if (protectedPages.includes(currentPage) && !isAuthenticated()) {
      const pageToRedirect = currentPage || "inicio.html";
      const redirect = encodeURIComponent(pageToRedirect);
      window.location.href = "login.html?redirect=" + redirect;
    }
  }

  function setupLogoutButton() {
    const logoutBtn = document.getElementById("logoutBtn");
    const userInfo = document.getElementById("userInfo");
    const portalBtn = document.getElementById("portalBtn");
    const serviciosNav = document.getElementById("serviciosNav");
    const loginNav = document.getElementById("loginNav");

    if (!logoutBtn && !userInfo && !portalBtn && !serviciosNav && !loginNav) {
      return;
    }

    try {
      const auth = sessionStorage.getItem("authUser");
      if (auth) {
        const userData = JSON.parse(auth);
        document.body.classList.add("student-mode");

        if (userInfo) {
          userInfo.textContent = `Bienvenido, ${userData.user}`;
          userInfo.style.display = "inline-block";
        }

        if (logoutBtn) {
          logoutBtn.style.display = "inline-flex";
          logoutBtn.addEventListener("click", e => {
            e.preventDefault();
            sessionStorage.removeItem("authUser");
            window.location.href = "login.html";
          });
        }

        if (portalBtn) portalBtn.style.display = "inline-flex";
        if (serviciosNav) serviciosNav.style.display = "block";
        if (loginNav) loginNav.style.display = "none";

        return;
      }
    } catch (e) {
      console.error("Error procesando autenticación:", e);
    }

    document.body.classList.remove("student-mode");
    if (userInfo) userInfo.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (portalBtn) portalBtn.style.display = "none";
    if (serviciosNav) serviciosNav.style.display = "none";
    if (loginNav) loginNav.style.display = "block";
  }

  // =========================================================================
  // 2. CARGA DE COMPONENTES (Header, Navegación, Footer)
  // =========================================================================

  async function cargarEstructura() {
    try {
      const [headHTML, navHTML, footHTML] = await Promise.all([
        fetch("../components/encabezado.html").then(r => r.text()),
        fetch("../components/navegacion.html").then(r => r.text()),
        fetch("../components/pie-pagina.html").then(r => r.text())
      ]);

      const headEl = document.getElementById("encabezado");
      const navEl = document.getElementById("navegacion");
      const footEl = document.getElementById("pie-pagina");

      if (headEl) {
        headEl.innerHTML = headHTML;
      }

      if (navEl) navEl.innerHTML = navHTML;
      if (footEl) footEl.innerHTML = footHTML;

      activarEnlaceActual();
      setupLogoutButton();
      updateCarritoCount();
      updateHeaderOffset();

      window.addEventListener("resize", updateHeaderOffset);
      observarAnimaciones();

    } catch (error) {
      console.error("Error cargando estructura:", error);
    }
  }

  // =========================================================================
  // 3. AJUSTAR ALTURA DEL HEADER
  // =========================================================================

  function updateHeaderOffset() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const height = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--header-height', `${height}px`);
  }

  // =========================================================================
  // 4. RESALTAR ENLACE ACTUAL EN NAVEGACIÓN
  // =========================================================================

  function activarEnlaceActual() {
    let currentPage = window.location.pathname.split("/").pop();
    if (!currentPage || currentPage === "index.html") {
      currentPage = "inicio.html";
    }

    const links = document.querySelectorAll("#nav-list a");
    links.forEach(link => {
      const href = (link.getAttribute("href") || "").split("/").pop();
      if (href === currentPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // =========================================================================
  // 5. BOTÓN VOLVER AL INICIO
  // =========================================================================

  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.style.display = window.scrollY > 500 ? "flex" : "none";
    });
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // =========================================================================
  // 6. OBSERVADOR DE ANIMACIONES (Intersection Observer)
  // =========================================================================

  function observarAnimaciones() {
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
      console.error("Error con IntersectionObserver:", error);
    }
  }

  // =========================================================================
  // 7. MOSTRAR PRODUCTOS DESDE JSON CON FETCH
  // =========================================================================

  async function cargarProductos() {
    const contenedor = document.getElementById("productos-container");
    if (!contenedor) return;

    try {
      const response = await fetch("../data/products.json");
      const productos = await response.json();

      const template = document.getElementById("producto-template");
      if (!template) {
        console.error("Template con id 'producto-template' no encontrado");
        return;
      }

      productos.forEach(producto => {
        const clone = template.content.cloneNode(true);
        
        clone.querySelector(".prod-title").textContent = producto.name;
        clone.querySelector(".prod-price").textContent = `$${producto.price.toLocaleString()}`;
        clone.querySelector(".prod-desc").textContent = producto.description;
        
        const img = clone.querySelector(".prod-img");
        if (img) img.src = producto.image;

        contenedor.appendChild(clone);
      });
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  }

  // =========================================================================
  // 8. WEB COMPONENT - ProductCard (ya está definido en product-card.js)
  // No es necesario redefinirlo aquí
  // =========================================================================

  // El componente <product-card> está disponible si se incluye:
  // <script src="recursos/scripts/product-card.js"></script>
  // en el HTML

  // =========================================================================
  // 9. ACTUALIZAR CONTADOR DEL CARRITO
  // =========================================================================

  function updateCarritoCount() {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const cartBtn = document.querySelector(".cart-count");
      if (cartBtn && cart.length > 0) {
        cartBtn.textContent = cart.length;
        cartBtn.style.display = "inline-flex";
      } else if (cartBtn) {
        cartBtn.style.display = "none";
      }
    } catch (e) {
      console.error("Error actualizando contador del carrito:", e);
    }
  }

  // Escuchar cambios en localStorage (desde otras pestañas/ventanas)
  window.addEventListener("storage", updateCarritoCount);

  // =========================================================================
  // 10. FUNCIÓN PARA IR AL CARRITO CON VALIDACIÓN DE LOGIN
  // =========================================================================

  window.irAlCarrito = function() {
    const isLoggedIn = sessionStorage.getItem("authUser");
    if (!isLoggedIn) {
      const redirect = encodeURIComponent("carrito.html");
      window.location.href = `login.html?redirect=${redirect}`;
      return;
    }
    window.location.href = "carrito.html";
  };

  // =========================================================================
  // INICIALIZACIÓN
  // =========================================================================

  requireAuthForPage();
  cargarEstructura();
  cargarProductos();

});
