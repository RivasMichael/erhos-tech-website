# ERHOS TECHNOLOGY — Sitio Web Corporativo

Sitio web estático para **Erhos Technology**, una consultora tecnológica peruana que ofrece soluciones digitales a emprendedores y PYMEs. Sirve como portafolio y canal de captación de clientes, integrando una presentación de servicios, proyectos realizados y formulario de contacto vía WhatsApp.

---

## Tabla de contenidos

- [Descripción](#descripción)
- [Páginas](#páginas)
- [Tecnologías](#tecnologías)
- [Características](#características)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Cómo ejecutar](#cómo-ejecutar)

---

## Descripción

**Erhos Technology** es una empresa de desarrollo de software y consultoría digital con sede en Perú. Este sitio tiene como objetivo presentar la marca, sus servicios, proceso de trabajo y proyectos del portafolio, facilitando el contacto directo con potenciales clientes a través de WhatsApp.

El sitio está completamente en español, es responsive (móvil, tablet y desktop) y no requiere ningún backend ni proceso de compilación.

---

## Páginas

| Archivo | Descripción |
|---|---|
| `Index.html` | Página principal: hero con carrusel de video, servicios, proceso y FAQ |
| `sobre-mi.html` | Sobre la empresa: misión, visión y público objetivo |
| `proceso.html` | Proceso de trabajo detallado en 6 etapas |
| `proyectos.html` | Portafolio con 6 proyectos realizados |
| `contacto.html` | Formulario de contacto y redes sociales |
| `politica-privacidad.html` | Política de privacidad |

---

## Tecnologías

- **HTML5** — Marcado semántico
- **CSS3** — Variables CSS, Grid, Flexbox, animaciones y diseño responsive
- **JavaScript (Vanilla)** — Sin frameworks, lógica del carrusel, menú móvil, acordeón, animaciones y formulario
- **Google Fonts** — `Bebas Neue` y `DM Sans`
- **Font Awesome 6.5.0** — Iconografía (CDN)

> No usa React, Vue, Angular ni ningún framework de JS. No tiene package.json ni proceso de build.

---

## Características

- **Carrusel de video** en el hero con autoplay, controles manuales, puntos de navegación y soporte para swipe táctil
- **Menú hamburguesa** para móviles con cierre al hacer clic fuera
- **Animaciones scroll-reveal** usando `IntersectionObserver`
- **Acordeón FAQ** con patrón de apertura única
- **Header sticky** con sombra progresiva al hacer scroll
- **Formulario de contacto** que redirige a WhatsApp con mensaje pre-completado
- **Diseño responsive** con breakpoints en 900px y 640px
- **Paleta de marca**: negro `#000000`, rojo `#CC0000` y blanco

---

## Estructura del proyecto

```
P2_DesarrollopPWeb_ERHOSTECH/
├── Index.html
├── sobre-mi.html
├── proceso.html
├── proyectos.html
├── contacto.html
├── politica-privacidad.html
├── main.js
├── styles.css
├── img/
│   ├── logo.png
│   ├── T1_Idea.jpg — T5_Entrega.jpg      # Imágenes del proceso
│   └── P1_Economistas.jpg — P6_Comercio.jpg  # Imágenes del portafolio
└── Videos/
    ├── PrincipalHome1.mp4
    ├── PrincipalHom2.mp4
    ├── PrincipaHome3.mp4
    └── P2_QuienesSomos.mp4
```

---

## Cómo ejecutar

Al ser un sitio 100% estático, basta con abrir `Index.html` en cualquier navegador moderno.

Para un entorno de desarrollo local con recarga automática puedes usar la extensión **Live Server** de VS Code o cualquier servidor HTTP local:

```bash
# Con Python
python -m http.server 3000

# Con Node.js (npx)
npx serve .
```

Luego abre `http://localhost:3000` en tu navegador.

> **Nota:** Los videos del carrusel pueden no reproducirse correctamente si se abre el archivo directamente con `file://` en algunos navegadores. Se recomienda usar un servidor local.
