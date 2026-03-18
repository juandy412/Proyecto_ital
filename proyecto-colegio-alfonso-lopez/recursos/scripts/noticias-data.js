/*
  Base de datos de noticias.
  Cada noticia debe incluir:
  - id: Identificador único
  - titulo: Título de la noticia
  - fecha: Fecha de publicación
  - area: Área responsable
  - resumen: Texto corto para el listado
  - contenido: HTML de mayor detalle
  - imagen: Ruta de imagen ilustrativa
*/

const noticias = [
  {
    id: 1,
    titulo: "Bienvenido al nuevo portal del ITAL",
    fecha: "18 de Marzo de 2026",
    area: "Desarrollo Web",
    resumen: "Hemos lanzado una nueva versión del sitio con secciones dinámicas, login y datos desde JSON.",
    contenido: `
      <p>Esta noticia presenta las principales mejoras del portal:</p>
      <ul>
        <li>Login con credenciales de prueba (fines educativos).</li>
        <li>Secciones dinámicas cargadas desde archivos HTML incluyendo header, nav y footer.</li>
        <li>Productos y noticias cargados desde archivos JSON.</li>
        <li>Web Components personalizados con Shadow DOM.</li>
      </ul>
      <p>Explora las páginas y descubre cómo se implementaron estas funciones.</p>
    `,
    imagen: "recursos/imagenes/noticias-lanzamiento.jpg"
  },
  {
    id: 2,
    titulo: "Nuevas noticias dentro del portal educativo",
    fecha: "17 de Marzo de 2026",
    area: "Comunicación Institucional",
    resumen: "Se creó una sección de noticias para mantener a la comunidad informada sobre los eventos internos.",
    contenido: `
      <p>La sección de noticias se ha diseñado para que los estudiantes y docentes puedan consultar:</p>
      <ul>
        <li>Eventos académicos</li>
        <li>Convocatorias</li>
        <li>Proyectos institucionales</li>
      </ul>
      <p>La información se carga automáticamente y permite agregar nuevas noticias modificando un archivo JSON.</p>
    `,
    imagen: "recursos/imagenes/noticias-estudiantes.jpg"
  },
  {
    id: 3,
    titulo: "Gran Convocatoria para el Club de Robótica 2026",
    fecha: "15 de Noviembre de 2025",
    area: "Área de Sistemas",
    resumen: "Inscripciones abiertas para el nuevo club de robótica del ITAL.",
    contenido: `
      <p>El Instituto Técnico Agropecuario y López abre oficialmente la convocatoria 2026 para su club de robótica.</p>
      <p>Los estudiantes seleccionados recibirán formación en:</p>
      <ul>
        <li>Programación de robots</li>
        <li>Electrónica aplicada</li>
        <li>Modelado y diseño 3D</li>
      </ul>
      <p>Representarán a la institución en torneos regionales y nacionales.</p>
    `,
    imagen: "recursos/imagenes/noticias-robots.jpg"
  },
  {
    id: 4,
    titulo: "Mejoras de Infraestructura Deportiva",
    fecha: "2 de Septiembre de 2025",
    area: "Dirección Administrativa",
    resumen: "Renovación de la cancha múltiple y zonas deportivas.",
    contenido: `
      <p>Se instalaron nuevas zonas deportivas, iluminación y pisos renovados</p>
      <p>El objetivo es ofrecer mejores espacios para la formación integral de la comunidad estudiantil.</p>
    `,
    imagen: "recursos/imagenes/noticias-infraestructura.jpg"
  }
];
