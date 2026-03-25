/**
 * PRODUCT CARD - Web Component
 * Componente reutilizable que muestra tarjetas de productos
 * con encapsulación de estilos mediante Shadow DOM
 */

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
    const name = this.getAttribute("name") || "Producto";
    const price = this.getAttribute("price") || "0";
    const description = this.getAttribute("description") || "Sin descripción";
    const image = this.getAttribute("image") || "";

    const style = `
      <style>
        :host { display: block; font-family: inherit; }
        
        .card {
          background: #fff;
          border-radius: 8px;
          padding: 12px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          text-align: left;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 28px rgba(0,0,0,0.12);
        }
        
        .thumb {
          width: 100%;
          height: 140px;
          object-fit: cover;
          border-radius: 6px;
          background: #f0f0f0;
        }
        
        .title {
          font-weight: 700;
          margin: 8px 0;
          font-size: 1.05rem;
          color: #2c3e50;
        }
        
        .price {
          color: #4CAF50;
          font-weight: 700;
          margin-bottom: 8px;
          font-size: 1.1rem;
        }
        
        .desc {
          color: #555;
          font-size: 0.95rem;
          line-height: 1.4;
          margin-bottom: 12px;
        }
        
        .actions { margin-top: 12px; }
        
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 12px;
          border-radius: 6px;
          background: #4CAF50;
          color: #fff;
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s ease, transform 0.2s ease;
          width: 100%;
          font-size: 0.9rem;
        }
        
        .btn:hover {
          background: #388E3C;
          transform: scale(1.02);
        }
        
        .btn:active {
          transform: scale(0.98);
        }
      </style>
    `;

    this.shadowRoot.innerHTML = `
      ${style}
      <div class="card">
        <img class="thumb" src="${this.sanitizeUrl(image)}" alt="${this.sanitizeText(name)}" />
        <div class="title">${this.sanitizeText(name)}</div>
        <div class="price">${this.formatPrice(price)}</div>
        <div class="desc">${this.sanitizeText(description)}</div>
        <div class="actions">
          <button class="btn" type="button" id="buyBtn">Comprar</button>
        </div>
      </div>
    `;

    const btn = this.shadowRoot.getElementById("buyBtn");
    if (btn) {
      btn.addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("product-buy", {
          bubbles: true,
          composed: true,
          detail: {
            name,
            price,
            description,
            image
          }
        }));
      });
    }
  }

  
  sanitizeText(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  
  sanitizeUrl(url) {
    try {
      const parsed = new URL(url, window.location.href);
      return parsed.href;
    } catch {
      return "";
    }
  }

 
  formatPrice(price) {
    const num = Number(price);
    if (isNaN(num)) return "COP 100000";
    return `COP ${num.toLocaleString("es-ES")}`;
  }
}

// Registrar el Web Component
customElements.define("product-card", ProductCard);
