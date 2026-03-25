
const Modal = (() => {
  const createContainer = () => {
    let container = document.getElementById("modal-overlay");
    if (container) return container;

    container = document.createElement("div");
    container.id = "modal-overlay";
    container.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.25s ease;
    `;
    container.addEventListener("click", (event) => {
      if (event.target === container) {
        Modal.close();
      }
    });
    document.body.appendChild(container);
    requestAnimationFrame(() => { container.style.opacity = "1"; });
    return container;
  };

  const close = () => {
    const container = document.getElementById("modal-overlay");
    if (!container) return;
    container.style.opacity = "0";
    setTimeout(() => {
      container.remove();
    }, 250);
  };

  const open = ({ title = "", content = "", footer = "" }) => {
    const container = createContainer();
    container.innerHTML = "";

    const modal = document.createElement("div");
    modal.style.cssText = `
      width: min(900px, 100%);
      max-height: min(90vh, 760px);
      overflow: auto;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.25);
      padding: 18px 24px 22px;
      position: relative;
      display: flex;
      flex-direction: column;
    `;

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "×";
    closeBtn.style.cssText = `
      position: absolute;
      top: 12px;
      right: 12px;
      border: none;
      background: none;
      font-size: 1.8rem;
      cursor: pointer;
      color: #333;
    `;
    closeBtn.addEventListener("click", close);

    const titleEl = document.createElement("h2");
    titleEl.textContent = title;
    titleEl.style.margin = "0 0 14px 0";
    titleEl.style.color = "var(--primary)";

    const contentEl = document.createElement("div");
    contentEl.innerHTML = content;
    contentEl.style.flex = "1";
    contentEl.style.marginBottom = "18px";

    const footerEl = document.createElement("div");
    footerEl.innerHTML = footer;
    footerEl.style.textAlign = "right";

    modal.appendChild(closeBtn);
    modal.appendChild(titleEl);
    modal.appendChild(contentEl);
    if (footer) modal.appendChild(footerEl);

    container.appendChild(modal);
  };

  return { open, close };
})();
