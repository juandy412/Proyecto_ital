document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("productos-container");
  const tpl = document.getElementById("product-template");

  if (!container || !tpl) return;

  fetch("../data/products.json")
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cargar products.json");
      return res.json();
    })
    .then(products => {
      // Crear al menos 3 productos dinámicos usando la plantilla <template>
      products.slice(0, 3).forEach(p => {
        const clone = tpl.content.cloneNode(true);
        const img = clone.querySelector(".prod-img");
        const title = clone.querySelector(".prod-title");
        const price = clone.querySelector(".prod-price");
        const desc = clone.querySelector(".prod-desc");

        if (img) img.src = p.image;
        if (title) title.textContent = p.name;
        if (price) price.textContent = `COP ${Number(p.price).toLocaleString()}`;
        if (desc) desc.textContent = p.description;

        container.appendChild(clone);
      });
    })
    .catch(err => {
      console.error("Error cargando productos:", err);
      container.innerHTML = "<p style='color:#c00;'>No se pudieron cargar los productos.</p>";
    });
});