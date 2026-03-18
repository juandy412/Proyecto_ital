// Script para la sección "Programas" que muestra detalles en un modal y permite comprar.

const programaDetalles = {
  agropecuario: {
    titulo: "Técnica Agropecuaria",
    cuerpo: `
      <p>Este énfasis aborda procesos productivos agropecuarios, manejo de cultivos, ganadería y agroindustria sostenible.</p>
      <ul style="margin: 12px 0 0 20px;">
        <li>Producción agrícola y manejo de suelos</li>
        <li>Ganadería de pequeño y mediano tamaño</li>
        <li>Agroindustria y comercialización de productos</li>
      </ul>
    `,
    linkText: "Ver más sobre Agropecuario",
    linkHref: "agropecuario.html",
  },
  comercio: {
    titulo: "Técnica en Comercio",
    cuerpo: `
      <p>En este programa se desarrollan habilidades administrativas, contables y comerciales para el mundo de los negocios.</p>
      <ul style="margin: 12px 0 0 20px;">
        <li>Contabilidad básica y registros financieros</li>
        <li>Gestión de inventarios y ventas</li>
        <li>Atención al cliente y mercadeo</li>
      </ul>
    `,
    linkText: "Ver más sobre Comercio",
    linkHref: "comercio.html",
  },
  sistemas: {
    titulo: "Técnica en Sistemas",
    cuerpo: `
      <p>Este énfasis está enfocado en el desarrollo de software, redes y soluciones tecnológicas para empresas.</p>
      <ul style="margin: 12px 0 0 20px;">
        <li>Programación y desarrollo web</li>
        <li>Redes y administración de sistemas</li>
        <li>Seguridad informática y bases de datos</li>
      </ul>
    `,
    linkText: "Ver más sobre Sistemas",
    linkHref: "sistemas.html",
  },
};

window.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll("button[data-program]");
  if (!botones.length) return;

  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-program");
      const price = btn.getAttribute("data-price");
      const name = btn.getAttribute("data-name");
      const data = programaDetalles[key];
      if (!data) return;

      // Verificar si el usuario está logueado
      const isLoggedIn = sessionStorage.getItem("authUser");
      
      if (!isLoggedIn) {
        // Redirigir a login
        window.location.href = "login.html?redirect=programas.html";
        return;
      }

      // Si está logueado, mostrar modal de inscripción
      Modal.open({
        title: data.titulo,
        content: `
          ${data.cuerpo}
          <div style="background: rgba(76, 175, 80, 0.08); padding: 16px; border-radius: 8px; margin-top: 18px;">
            <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 8px;">Valor de la inscripción:</div>
            <div style="font-size: 2rem; font-weight: 700; color: var(--primary);">$ ${Number(price).toLocaleString()}</div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">por semestre</div>
          </div>
        `,
        footer: `
          <button class="portal-btn" style="background: var(--primary); width: 100%; margin-right: 8px;" onclick="addToProgramCart('${name}', ${price}); Modal.close();">
            <i class="fas fa-shopping-cart"></i> Agregar al carrito
          </button>
        `,
      });
    });
  });
});

function addToProgramCart(name, price) {
  // Agregar programa al carrito
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push({
    name: name,
    price: price,
    type: "program",
    fecha: new Date().toLocaleDateString()
  });
  localStorage.setItem("cart", JSON.stringify(cart));

  // Mostrar notificación
  showToastNotification(`${name} agregado al carrito`, "success");
}

function showToastNotification(message, type = "success") {
  // Crear contenedor si no existe
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.style.cssText = "position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 12px;";
    document.body.appendChild(toastContainer);
  }

  // Crear toast
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    padding: 14px 18px;
    border-radius: 8px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.18);
    color: white;
    font-weight: 600;
    animation: slideIn 0.3s ease;
    background: ${type === "success" ? "#4caf50" : "#f44336"};
  `;
  toastContainer.appendChild(toast);

  // Eliminar tras 3 segundos
  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
