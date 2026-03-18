// Manejo de compra de productos (requiere login)

document.addEventListener("DOMContentLoaded", () => {
  const toastContainer = createToastContainer();

  function isAuthenticated() {
    try {
      const auth = sessionStorage.getItem("authUser");
      return !!(auth && JSON.parse(auth).user);
    } catch {
      return false;
    }
  }

  function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("toast-hide");
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  function createToastContainer() {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.style.cssText = "position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 12px;";
      document.body.appendChild(container);
    }
    return container;
  }

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  }

  function setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function addToCart(item) {
    const cart = getCart();
    cart.push(item);
    setCart(cart);
  }

  function handlePurchase(detail) {
    if (!isAuthenticated()) {
      const redirect = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = `login.html?redirect=${redirect}`;
      return;
    }

    addToCart(detail);
    showToast(`Producto agregado al carrito: ${detail.name}`, "success");
  }

  document.addEventListener("product-buy", (event) => {
    handlePurchase(event.detail);
  });
});
