

document.addEventListener("DOMContentLoaded", () => {

  const cargarEstructura = async () => {
    try {
      const [headHTML, navHTML, footHTML] = await Promise.all([
        fetch("encabezado.html").then(r => r.text()),
        fetch("navegacion.html").then(r => r.text()),
        fetch("pie-pagina.html").then(r => r.text())
      ]);

      if (document.getElementById("encabezado"))
        document.getElementById("encabezado").innerHTML = headHTML;

      if (document.getElementById("navegacion"))
        document.getElementById("navegacion").innerHTML = navHTML;

      if (document.getElementById("pie-pagina"))
        document.getElementById("pie-pagina").innerHTML = footHTML;

      activarEnlaceActual();
      observarAnimaciones();

    } catch (error) {
      console.error("Error cargando estructura:", error);
    }
  };

  cargarEstructura();



  function activarEnlaceActual() {
    let archivo = window.location.pathname.split("/").pop();

    if (archivo === "" || archivo === "index.html")
      archivo = "inicio.html";

    const links = document.querySelectorAll("#nav-list a");

    links.forEach(link => {
      const destino = link.getAttribute("href");
      if (destino === archivo) link.classList.add("active");
      else link.classList.remove("active");
    });
  }



  const scrollTopBtn = document.getElementById("scrollTopBtn");

  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.style.display = window.scrollY > 500 ? "flex" : "none";
    });

    scrollTopBtn.addEventListener("click", e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }



  function observarAnimaciones() {
    const secciones = document.querySelectorAll(".fade-in-section");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    secciones.forEach(sec => observer.observe(sec));
  }




  if (document.getElementById("contenedor-noticias")) {

    let noticiasMostradas = 0;
    const noticiasPorPagina = 3;

    const contenedorNoticias = document.getElementById("contenedor-noticias");
    const btnMas = document.getElementById("btnCargarMas");
    const btnMenos = document.getElementById("btnCargarMenos");

    if (typeof noticias === "undefined") {
      console.error("⚠ ERROR: No existe el arreglo 'noticias'. Debes definirlo en noticias.html");
      return;
    }

    function renderNoticia(noticia) {
      const card = document.createElement("div");
      card.className = "card";
      card.style.textAlign = "left";

      card.innerHTML = `
        <h3 style="color: var(--primary);">${noticia.titulo}</h3>
        <p style="font-style: italic; color: var(--text-light);">${noticia.fecha} | ${noticia.area}</p>
        <p>${noticia.resumen}</p>
        <a href="noticia.html?id=${noticia.id}" class="portal-btn"
           style="background: var(--primary); margin-top: 15px;">
           Leer más
        </a>
      `;

      return card;
    }


    function mostrarNoticias() {
      for (let i = noticiasMostradas; i < noticiasMostradas + noticiasPorPagina; i++) {
        if (i >= noticias.length) {
          btnMas.style.display = "none";
          break;
        }

        contenedorNoticias.appendChild(renderNoticia(noticias[i]));
      }

      noticiasMostradas += noticiasPorPagina;

      btnMenos.style.display = noticiasMostradas > noticiasPorPagina ? "inline-flex" : "none";
    }


    function verMenos() {
      noticiasMostradas -= noticiasPorPagina;
      if (noticiasMostradas < noticiasPorPagina) noticiasMostradas = noticiasPorPagina;

      contenedorNoticias.innerHTML = "";

      for (let i = 0; i < noticiasMostradas; i++) {
        contenedorNoticias.appendChild(renderNoticia(noticias[i]));
      }

      btnMas.style.display = "inline-flex";
      btnMenos.style.display = noticiasMostradas > noticiasPorPagina ? "inline-flex" : "none";
    }

    btnMas.addEventListener("click", mostrarNoticias);
    btnMenos.addEventListener("click", verMenos);

    mostrarNoticias();
  }

});
