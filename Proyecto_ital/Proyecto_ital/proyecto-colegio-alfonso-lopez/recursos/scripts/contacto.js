
window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("contactFeedback");
  if (!form) return;

  function showFeedback(message, type = "success") {
    if (!feedback) return;
    feedback.textContent = message;
    feedback.className = `contact-feedback ${type}`;
    feedback.style.display = "block";
    setTimeout(() => {
      feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const asunto = form.asunto.value.trim();
    const mensaje = form.mensaje.value.trim();

    // Validación básica
    if (!nombre || !email || !asunto || !mensaje) {
      showFeedback("⚠️ Por favor completa todos los campos obligatorios (*)", "error");
      return;
    }

    // Validación de email básica
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFeedback("⚠️ Por favor ingresa un correo válido", "error");
      return;
    }

    // Éxito - mostrar feedback en la página
    showFeedback(`✅ ¡Mensaje enviado! Gracias por escribirnos, ${nombre}. Nos pondremos en contacto pronto.`, "success");

    // También mostrar modal
    Modal.open({
      title: "Mensaje enviado con éxito",
      content: `
        <div style="text-align: center;">
          <p style="font-size: 2rem; margin-bottom: 16px;">✅</p>
          <p>Gracias por escribirnos, <strong>${nombre}</strong>.</p>
          <p>Hemos recibido tu mensaje y nos pondremos en contacto a través de <strong>${email}</strong> en un plazo máximo de 48 horas.</p>
        </div>
      `,
      footer: `<button class="portal-btn" style="width:100%;" onclick="Modal.close()">Cerrar</button>`,
    });

    // Limpiar formulario
    form.reset();
    
    // Limpiar feedback después de 5 segundos
    setTimeout(() => {
      feedback.style.display = "none";
    }, 5000);
  });
});
