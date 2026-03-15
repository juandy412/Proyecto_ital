document.addEventListener("DOMContentLoaded", () => {

  /* ================================
     AUTH (login simple - session)
     ================================ */
  function isAuthenticated() {
    try {
      const s = sessionStorage.getItem("authUser");
      return !!(s && JSON.parse(s).user);
    } catch (e) {
      return false;
    }
  }

  function requireAuthForPage() {
    const protectedPages = [
      "portal-academico.html",
      "servicios.html",
      "panel-estudiante.html"
      // agrega otros nombres de páginas que deban requerir login
    ];
    let archivo = window.location.pathname.split("/").pop();
    if (archivo === "" || archivo === "index.html")
      archivo = "inicio.html";

    if (protectedPages.includes(archivo)) {
      if (!isAuthenticated()) {
        const redirect = encodeURIComponent(window.location.pathname + window.location.search);
        window.location.href = "login.html?redirect=" + redirect;
      }
    }
  }

  function setupLogoutButton() {
    const logoutBtn = document.getElementById("logoutBtn");
    const userInfo = document.getElementById("userInfo");
    const portalBtn = document.getElementById("portalBtn");
    const serviciosNav = document.getElementById("serviciosNav");
    const loginNav = document.getElementById("loginNav");
    if (!logoutBtn && !userInfo && !portalBtn && !serviciosNav && !loginNav) return;

    try {
      const s = sessionStorage.getItem("authUser");
      if (s) {
        const u = JSON.parse(s);
        document.body.classList.add("student-mode");
        if (userInfo) {
          userInfo.textContent = `Hola, ${u.user}`;
          userInfo.style.display = "inline-block";
        }
        if (logoutBtn) {
          logoutBtn.style.display = "inline-flex";
          logoutBtn.addEventListener("click", e => {
            e.preventDefault();
            sessionStorage.removeItem("authUser");
            window.location.href = "login.html";
          });
        }
        if (portalBtn) {
          portalBtn.style.display = "inline-flex";
        }
        if (serviciosNav) {
          serviciosNav.style.display = "block";
        }
        if (loginNav) {
          loginNav.style.display = "none";
        }
        return;
      }
    } catch (e) {
      /* ignore */
    }

    document.body.classList.remove("student-mode");
    if (userInfo) userInfo.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (portalBtn) portalBtn.style.display = "none";
    if (serviciosNav) serviciosNav.style.display = "none";
    if (loginNav) loginNav.style.display = "block";
  }

  // Ejecutar protección al inicio
  requireAuthForPage();

  /* ================================
     1. CARGA DE ENCABEZADO / MENÚ / PIE
  =================================== */
  const cargarEstructura = async () => {
    try {
      const [headHTML, navHTML, footHTML] = await Promise.all([
        fetch("components/encabezado.html").then(r => r.text()),
        fetch("components/navegacion.html").then(r => r.text()),
        fetch("components/pie-pagina.html").then(r => r.text())
      ]);

      const headEl = document.getElementById("encabezado");
      const navEl = document.getElementById("navegacion");
      const footEl = document.getElementById("pie-pagina");

      if (headEl) headEl.innerHTML = headHTML;
      const navPlaceholder = headEl?.querySelector("#nav-placeholder");
      if (navPlaceholder) {
        // Insertar siempre la navegación dentro del header para que se vea como un solo bloque
        navPlaceholder.innerHTML = navHTML;
      }
      // Mantener el contenedor #navegacion vacío para compatibilidad con páginas antiguas.
      if (navEl) navEl.innerHTML = "";
      if (footEl) footEl.innerHTML = footHTML;

      // después de insertar la navegación: activar enlace actual y configurar logout
      activarEnlaceActual();
      setupLogoutButton();

      // Ajustar espacio superior en función de la altura real del header + nav
      updateHeaderOffset();
      window.addEventListener("resize", updateHeaderOffset);

      observarAnimaciones();

    } catch (error) {
      console.error("Error cargando estructura:", error);
    }
  };

  cargarEstructura();

  /* ===============================================
      2. RESALTAR MENÚ ACTUAL
     =============================================== */

  function updateHeaderOffset() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const height = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--header-height', `${height}px`);
  }
  function activarEnlaceActual() {
    let archivo = window.location.pathname.split("/").pop();

    if (archivo === "" || archivo === "index.html")
      archivo = "inicio.html";

    const links = document.querySelectorAll("#nav-list a");

    links.forEach(link => {
      const destino = (link.getAttribute("href") || "").split("/").pop();
      if (destino === archivo) link.classList.add("active");
      else link.classList.remove("active");
    });
  }

  /* ===============================================
      3. BOTÓN VOLVER ARRIBA
  =============================================== */
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

  /* ===============================================
      4. EFECTO FADE-IN
  =============================================== */
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

  /* ======================================================
       5. SISTEMA DE NOTICIAS DINÁMICAS (si existe)
     ====================================================== */
  function getNoticiasArray() {
    if (typeof window !== "undefined" && window.noticias) return window.noticias;
    if (typeof noticias !== "undefined") return noticias;
    return null;
  }

  if (document.getElementById("contenedor-noticias")) {
    let noticiasMostradas = 0;
    const noticiasPorPagina = 3;

    const contenedorNoticias = document.getElementById("contenedor-noticias");
    const btnMas = document.getElementById("btnCargarMas");
    const btnMenos = document.getElementById("btnCargarMenos");

    const noticiasArr = getNoticiasArray();
    if (!noticiasArr) {
      console.error("⚠ ERROR: No existe el arreglo 'noticias'. Debes definirlo en noticias-data.js");
    } else {

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
          if (i >= noticiasArr.length) {
            if (btnMas) btnMas.style.display = "none";
            break;
          }
          contenedorNoticias.appendChild(renderNoticia(noticiasArr[i]));
        }
        noticiasMostradas += noticiasPorPagina;
        if (btnMenos) btnMenos.style.display = noticiasMostradas > noticiasPorPagina ? "inline-flex" : "none";
      }

      function verMenos() {
        noticiasMostradas -= noticiasPorPagina;
        if (noticiasMostradas < noticiasPorPagina) noticiasMostradas = noticiasPorPagina;

        contenedorNoticias.innerHTML = "";
        for (let i = 0; i < noticiasMostradas; i++) {
          contenedorNoticias.appendChild(renderNoticia(noticiasArr[i]));
        }
        if (btnMas) btnMas.style.display = "inline-flex";
        if (btnMenos) btnMenos.style.display = noticiasMostradas > noticiasPorPagina ? "inline-flex" : "none";
      }

      if (btnMas) btnMas.addEventListener("click", mostrarNoticias);
      if (btnMenos) btnMenos.addEventListener("click", verMenos);

      mostrarNoticias();
    }
  }

  /* ======================================================
       6. CARGAR DETALLE DE NOTICIA
     ====================================================== */
  if (window.location.pathname.includes("noticia.html")) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const noticiasArr = getNoticiasArray();

    if (noticiasArr && id) {
      const noticia = noticiasArr.find(n => n.id == id);
      if (noticia) {
        const tEl = document.getElementById("tituloNoticia");
        const fEl = document.getElementById("fechaArea");
        const cEl = document.getElementById("contenidoNoticia");
        const imgEl = document.getElementById("imagenNoticia");

        if (tEl) tEl.textContent = noticia.titulo;
        if (fEl) fEl.textContent = noticia.fecha + " | " + noticia.area;
        if (cEl) cEl.innerHTML = noticia.contenido;
        if (imgEl) imgEl.src = noticia.imagen;
      }
    }
  }

});
