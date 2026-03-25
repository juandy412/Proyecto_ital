
function setupFooter() {
  const yearElement = document.getElementById("anio");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Ejecutar al cargar
document.addEventListener("DOMContentLoaded", setupFooter);
