// Script para manejar el carrito de inscripciones

window.addEventListener("DOMContentLoaded", () => {
  cargarCarrito();

  // Botón volver al carrito desde otros lados
  window.irACheckout = function() {
    Modal.open({
      title: "Confirmar inscripción",
      content: `
        <p>Para completar tu inscripción, por favor contacta a nuestra oficina de admisiones o realiza el pago en línea.</p>
        <div style="background: rgba(76, 175, 80, 0.08); padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 0; font-size: 0.9rem;"><strong>Teléfono:</strong> +57 123 456 7890</p>
          <p style="margin: 8px 0 0; font-size: 0.9rem;"><strong>Email:</strong> admisiones@ital.edu.co</p>
        </div>
      `,
      footer: `
        <button class="portal-btn" style="background: var(--primary); width: 100%;" onclick="Modal.close(); contactarAdmisiones();">
          <i class="fas fa-envelope"></i> Contactar admisiones
        </button>
      `
    });
  };

  window.contactarAdmisiones = function() {
    window.location.href = "contacto.html";
  };
});

function cargarCarrito() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const itemsContainer = document.getElementById("itemsCarrito");
  const resumenContainer = document.getElementById("resumenCarrito");
  const carritoVacio = document.getElementById("carritoVacio");
  const carritoContenido = document.getElementById("carritoContenido");

  if (cart.length === 0) {
    carritoVacio.style.display = "block";
    carritoContenido.style.display = "none";
    return;
  }

  carritoVacio.style.display = "none";
  carritoContenido.style.display = "block";

  itemsContainer.innerHTML = "";

  let total = 0;
  const colores = ["color-1", "color-2", "color-3", "color-4", "color-5", "color-6"];
  
  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = `item-carrito ${colores[index % colores.length]}`;
    itemDiv.innerHTML = `
      <div class="item-info">
        <h4>${item.name}</h4>
        <p>${item.description || ""} ${item.fecha ? `• Agregado el ${item.fecha}` : ""}</p>
      </div>
      <div class="item-precio">$ ${Number(item.price).toLocaleString()}</div>
      <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">
        <i class="fas fa-trash"></i> Eliminar
      </button>
    `;
    itemsContainer.appendChild(itemDiv);
    total += Number(item.price);
  });

  // Actualizar resumen
  const subtotal = total;

  resumenContainer.innerHTML = `
    <div class="resumen-fila">
      <span>${cart.length} ${cart.length === 1 ? "programa" : "programas"}</span>
      <span>$ ${subtotal.toLocaleString()}</span>
    </div>
    <div class="resumen-fila total">
      <span>Total a pagar:</span>
      <span>$ ${subtotal.toLocaleString()}</span>
    </div>
  `;
}

window.eliminarDelCarrito = function(index) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const item = cart[index];
  
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));

  showToastNotification(`${item.name} eliminado del carrito`, "info");
  cargarCarrito();
};

function showToastNotification(message, type = "info") {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.style.cssText = "position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 12px;";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.style.cssText = `
    padding: 14px 18px;
    border-radius: 8px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.18);
    color: white;
    font-weight: 600;
    animation: slideIn 0.3s ease;
    background: ${type === "success" ? "#4caf50" : type === "error" ? "#f44336" : "#2196f3"};
  `;
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
