/**
 * SHARED - Funciones compartidas entre componentes
 * Utilidades globales para toda la aplicación
 */

/**
 * Carga un componente HTML de forma dinámica
 * @param {string} url - Ruta del archivo HTML
 * @param {string} elementId - ID del elemento donde se cargará
 */
async function loadComponent(url, elementId) {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Elemento con ID '${elementId}' no encontrado`);
      return false;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    element.innerHTML = html;
    return true;
  } catch (error) {
    console.error(`Error cargando componente ${url}:`, error);
    return false;
  }
}

/**
 * Verifica si el usuario está autenticado
 */
function isAuthenticated() {
  try {
    const auth = sessionStorage.getItem("authUser");
    return !!(auth && JSON.parse(auth).user);
  } catch (e) {
    return false;
  }
}

/**
 * Obtiene los datos del usuario autenticado
 */
function getAuthUser() {
  try {
    const auth = sessionStorage.getItem("authUser");
    return auth ? JSON.parse(auth) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Redirige a una página si no está autenticado
 * @param {string} loginPage - Ruta a la página de login
 */
function requireAuth(loginPage = "login.html") {
  if (!isAuthenticated()) {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const redirect = encodeURIComponent(currentPage);
    window.location.href = `${loginPage}?redirect=${redirect}`;
  }
}

/**
 * Cierra la sesión
 * @param {string} redirectPage - Página a redirigir después de cerrar sesión
 */
function logout(redirectPage = "index.html") {
  sessionStorage.removeItem("authUser");
  window.location.href = redirectPage;
}

/**
 * Formatea un número como moneda COP
 * @param {number} amount - Cantidad a formatear
 */
function formatCurrency(amount) {
  const num = Number(amount);
  if (isNaN(num)) return "COP 0";
  return `COP ${num.toLocaleString("es-ES")}`;
}

/**
 * Obtiene el parámetro de query string
 * @param {string} param - Nombre del parámetro
 */
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
 * Desplaza suavemente a un elemento
 * @param {string} elementId - ID del elemento
 */
function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Event dispatcher global para componentes
 */
const AppEvents = {
  listeners: {},
  
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  },

  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  },

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
  }
};

// Exportar para uso global
window.AppShared = {
  loadComponent,
  isAuthenticated,
  getAuthUser,
  requireAuth,
  logout,
  formatCurrency,
  getQueryParam,
  scrollToElement,
  AppEvents
};
