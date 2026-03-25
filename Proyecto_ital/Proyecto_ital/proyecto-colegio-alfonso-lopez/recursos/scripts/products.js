document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("productos-container");
  const tpl = document.getElementById("product-template");

  if (!container) return;

  fetch("../data/products.json")
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cargar products.json");
      return res.json();
    })
    .then(products => {
      products.forEach(p => {
        if (customElements.get("product-card")) {
          const el = document.createElement("product-card");
          el.setAttribute("name", p.name);
          el.setAttribute("price", p.price);
          el.setAttribute("description", p.description);
          el.setAttribute("image", p.image);
          container.appendChild(el);
        } else if (tpl) {
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
        }
      });
    })
    .catch(err => {
      console.error("Error cargando productos:", err);
      container.innerHTML = "<p style='color:#c00;'>No se pudieron cargar los productos.</p>";
    });
});