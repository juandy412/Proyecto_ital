
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errEl = document.getElementById("loginError");
  if (!form) return;

  function getRedirectTarget() {
    const params = new URLSearchParams(window.location.search);
    const r = params.get("redirect");
    if (!r) return "inicio.html";
    try {
      const decoded = decodeURIComponent(r);
      if (decoded.includes("http") || decoded.includes("://")) return "inicio.html";
      if (decoded.endsWith(".html")) return decoded.startsWith("/") ? decoded.slice(1) : decoded;
    } catch (e) {}
    return "inicio.html";
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const user = (document.getElementById("username").value || "").trim();
    const pass = (document.getElementById("password").value || "").trim();

    const VALID_USER = "estudiante";
    const VALID_PASS = "12345";

    if (user === VALID_USER && pass === VALID_PASS) {
      const payload = { user: VALID_USER, role: "student", ts: Date.now() };
      sessionStorage.setItem("authUser", JSON.stringify(payload));

      const redirect = getRedirectTarget();
      window.location.href = redirect;
    } else {
      if (errEl) {
        errEl.textContent = "Usuario o contraseña incorrectos.";
        errEl.style.display = "block";
      }
      const pwd = document.getElementById("password");
      if (pwd) pwd.value = "";
    }
  });
});