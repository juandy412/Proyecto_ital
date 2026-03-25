
function setupHeaderUserArea() {
  const logoutBtn = document.getElementById("logoutBtn");
  const userInfo = document.getElementById("userInfo");
  const portalBtn = document.getElementById("portalBtn");

  if (!logoutBtn && !userInfo && !portalBtn) {
    return;
  }

  try {
    const auth = sessionStorage.getItem("authUser");
    if (auth) {
      const userData = JSON.parse(auth);
      document.body.classList.add("student-mode");

      if (userInfo) {
        userInfo.textContent = `Bienvenido, ${userData.user}`;
        userInfo.style.display = "inline-block";
      }

      if (logoutBtn) {
        logoutBtn.style.display = "inline-flex";
        logoutBtn.addEventListener("click", e => {
          e.preventDefault();
          sessionStorage.removeItem("authUser");
          window.location.href = "../pages/login.html";
        });
      }

      if (portalBtn) portalBtn.style.display = "inline-flex";
      return;
    }
  } catch (e) {
    console.error("Error procesando autenticación en header:", e);
  }

  document.body.classList.remove("student-mode");
  if (userInfo) userInfo.style.display = "none";
  if (logoutBtn) logoutBtn.style.display = "none";
  if (portalBtn) portalBtn.style.display = "none";
}

// Ejecutar al cargar
document.addEventListener("DOMContentLoaded", setupHeaderUserArea);
