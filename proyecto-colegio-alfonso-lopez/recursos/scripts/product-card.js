class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["name", "price", "description", "image"];
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute("name") || "";
    const price = this.getAttribute("price") || "";
    const description = this.getAttribute("description") || "";
    const image = this.getAttribute("image") || "";

    const style = `
      <style>
        :host{display:block;font-family:inherit}
        .card{background:#fff;border-radius:8px;padding:12px;box-shadow:0 6px 18px rgba(0,0,0,0.08);text-align:left}
        .thumb{width:100%;height:140px;object-fit:cover;border-radius:6px}
        .title{font-weight:700;margin:8px 0;font-size:1.05rem}
        .price{color:var(--primary);font-weight:700;margin-bottom:8px}
        .desc{color:#444;font-size:0.95rem}
        .actions{margin-top:12px}
        .btn{display:inline-flex;padding:8px 12px;border-radius:6px;background:var(--primary);color:#fff;text-decoration:none}
      </style>
    `;

    this.shadowRoot.innerHTML = `
      ${style}
      <div class="card">
        <img class="thumb" src="${image}" alt="${name}" />
        <div class="title">${name}</div>
        <div class="price">COP ${Number(price).toLocaleString()}</div>
        <div class="desc">${description}</div>
        <div class="actions">
          <a class="btn" href="programas.html">Ver</a>
        </div>
      </div>
    `;
  }
}

customElements.define("product-card", ProductCard);