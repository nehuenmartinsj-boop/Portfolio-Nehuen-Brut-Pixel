# Contexto del Proyecto: Nehuen M. Portfolio // 2025

Este documento proporciona una visión detallada de la arquitectura, diseño y objetivos estratégicos de la página web personal de Nehuen M.

---

## 1. Visión General
**Nombre del Proyecto:** Nehuen M. Portfolio // 2025  
**Propósito:** Herramienta digital de alta conversión diseñada para posicionar a Nehuen M. como un especialista en soluciones funcionales, SEO y embudos de venta (funnels).  
**Enfoque:** "Diseño invisible si no es funcional". La web no es solo un portafolio estético, sino una demostración de rendimiento y estrategia de conversión.

---

## 2. Pilares Estratégicos (Función)
El sitio está estructurado para guiar al usuario a través de un protocolo de conversión:
- **SEO & Performance:** Estructura optimizada para buscadores y velocidad de carga rápida (Vite + React).
- **Funnels:** Uso de CTAs estratégicos para dirigir al usuario desde el descubrimiento (Hero) hasta la acción (Contacto).
- **Ecosistema Google:** Integración planeada o activa con Firebase, Google Sheets y Google AI Studio para automatización de procesos.

---

## 3. Stack Tecnológico
- **Core:** React 19 + Vite.
- **Estilo:** Tailwind CSS 4.0 (usando la nueva arquitectura `@theme`).
- **Animaciones:** Framer Motion (`motion/react`) para interacciones fluidas y efectos de "slam" en el Hero.
- **Iconografía:** Lucide React.
- **IA:** Integración con `@google/genai` para funcionalidades inteligentes.

---

## 4. Sistema de Diseño (Estética)
La identidad visual sigue una estética **Industrial / Pixel-Art / Brutalista**, transmitiendo una sensación de "tecnología en crudo" pero refinada.

### Paleta de Colores
- **Background (Fondo):** `#000000` (Negro puro) - Proporciona un contraste total.
- **Ink (Texto/Bordes):** `#F5F5F0` (Blanco hueso/Beige) - Suaviza la lectura sobre fondo negro.
- **Accent (Acento):** `#B2FF59` (Verde Limón Neón) - Utilizado para destacar elementos críticos, CTAs y estados activos.

### Tipografía
- **Display (Títulos):** `"Press Start 2P"` - Estética pixelada retro para títulos principales y branding.
- **Mono (Datos/Protocolos):** `"JetBrains Mono"` - Usada en menús, etiquetas de tags y detalles técnicos, reforzando la idea de "código" y "sistemas".
- **Sans (Cuerpo):** `"Inter"` - Para párrafos y texto de lectura larga, asegurando legibilidad y modernidad.

### Elementos UI Clave
- **Pixel Border:** Bordes finos (`border-ink/30`) con sombras sólidas que no usan desenfoque, imitando el estilo de interfaces clásicas.
- **Scanlines & Noise:** Efectos visuales de "interferencia" en botones y cargas de formularios.
- **Marquee:** Una cinta en movimiento con palabras clave (SEO, FUNNELS, ESTRATEGIA) para dinamismo visual.

---

## 5. Pipelines y Flujos de Usuario
### Flujo de Conversión (Pipeline)
1. **Fase de Impacto (Hero):** Títulos grandes y dinámicos que definen la identidad (Diseñador / Desarrollador).
2. **Fase de Prueba (Sistemas):** Tarjetas de proyecto con tags técnicos que validan la capacidad técnica.
3. **Fase de Confianza (Estrategia):** Sección "Sobre mí" que explica la metodología y el enfoque en resultados medibles.
4. **Fase de Cierre (Protocolo):** Formulario de contacto temático ("Transmitir mensaje") con feedback visual de estado (transmitiendo/exitoso).

---

## 6. CTAs (Call to Action)
- **Primarios:** "Iniciar Protocolo" (Formulario), "Proyectos" (Hero).
- **Secundarios:** "Agendar Consulta", "Cerrar Protocolo" (Modales).
- **Estilo:** Botones con sombra sólida de color acento (`--color-accent`) que se desplazan al ser presionados (`active:translate`).

---

## 7. Notas Adicionales
- **Vibecoding:** El proyecto menciona el uso de prototipado ágil con IA (Google AI Studio, Claude Code).
- **Estado:** Actualmente posicionado como Junior Dev St. con base en Argentina.
