// Script para renderizar la sección de noticias dinámicamente
// Depende de "noticias" definido en recursos/scripts/noticias-data.js

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-noticias");
  if (!contenedor) return;

  const btnMas = document.getElementById("btnCargarMas");
  const btnMenos = document.getElementById("btnCargarMenos");

  const noticiasPorPagina = 3;
  let noticiasMostradas = 0;

  function crearTarjeta(noticia) {
    const card = document.createElement("div");
    card.className = "card";
    card.style.textAlign = "left";
    card.style.padding = "20px";
    card.style.borderRadius = "12px";
    card.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
    card.style.background = "white";

    card.innerHTML = `
      <div style="display:flex; gap:20px; flex-wrap:wrap; align-items:start;">
        <img src="${noticia.imagen}" alt="${noticia.titulo}" style="width:210px; height:140px; object-fit:cover; border-radius:10px; flex-shrink:0;" />
        <div style="flex:1; min-width:220px;">
          <h3 style="margin:0 0 10px; color: var(--primary);">${noticia.titulo}</h3>
          <div style="font-size:0.9rem; color:#666; margin-bottom:10px;">
            <span style="font-weight:600;">${noticia.area}</span> · ${noticia.fecha}
          </div>
          <p style="margin:0 0 16px; color:#333;">${noticia.resumen}</p>
          <button class="portal-btn" style="background: var(--primary);" data-id="${noticia.id}">Leer más</button>
        </div>
      </div>
    `;

    return card;
  }

  function renderizarNoticias() {
    const visibles = noticias.slice(0, noticiasMostradas);
    contenedor.innerHTML = "";
    visibles.forEach(noticia => contenedor.appendChild(crearTarjeta(noticia)));

    // Agregar manejadores de "Leer más" para mostrar modal con más detalles.
    const botonesLeerMas = contenedor.querySelectorAll("button[data-id]");
    botonesLeerMas.forEach((boton) => {
      boton.addEventListener("click", () => {
        const id = boton.getAttribute("data-id");
        const noticia = noticias.find(n => String(n.id) === id);
        if (!noticia) return;

        Modal.open({
          title: noticia.titulo,
          content: `
            <p style="margin:0 0 14px; color:#444;">${noticia.texto || noticia.resumen || "No hay más información."}</p>
            <div style="font-size:0.9rem; color:#666; margin-top:10px;">
              <strong>Área:</strong> ${noticia.area}<br />
              <strong>Fecha:</strong> ${noticia.fecha}
            </div>
          `,
          footer: `<a href="noticia.html?id=${noticia.id}" class="portal-btn" style="background: var(--primary);">Ver en página</a>`
        });
      });
    });

    if (btnMas) {
      btnMas.style.display = noticiasMostradas < noticias.length ? "inline-flex" : "none";
    }
    if (btnMenos) {
      btnMenos.style.display = noticiasMostradas > noticiasPorPagina ? "inline-flex" : "none";
    }
  }

  function cargarMas() {
    noticiasMostradas = Math.min(noticiasMostradas + noticiasPorPagina, noticias.length);
    renderizarNoticias();
  }

  function cargarMenos() {
    noticiasMostradas = Math.max(noticiasMostradas - noticiasPorPagina, noticiasPorPagina);
    renderizarNoticias();
  }

  // Inicializar
  noticiasMostradas = Math.min(noticiasPorPagina, noticias.length);
  renderizarNoticias();

  if (btnMas) btnMas.addEventListener("click", cargarMas);
  if (btnMenos) btnMenos.addEventListener("click", cargarMenos);
});
