/**
 * NAVIGATION - Funcionalidad de Navegación Principal
 * Maneja: Active link highlighting, rutas
 */

function setupNavigation() {
  const navList = document.getElementById("nav-list");
  if (!navList) return;

  const links = navList.querySelectorAll("a");
  const currentPage = window.location.pathname.split("/").pop() || "inicio.html";

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage || 
        (currentPage === "index.html" && href === "inicio.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Remover clase active si no hay login
  try {
    const auth = sessionStorage.getItem("authUser");
    const loginNav = document.getElementById("loginNav");
    if (loginNav) {
      loginNav.style.display = auth ? "none" : "list-item";
    }
  } catch (e) {
    console.error("Error verificando autenticación en nav:", e);
  }
}

// Ejecutar al cargar
document.addEventListener("DOMContentLoaded", setupNavigation);
