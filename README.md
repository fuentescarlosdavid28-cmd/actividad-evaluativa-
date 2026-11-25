# Actividad evaluativa: Web Components, HTML Templates y frameworks

## Integrantes

- Carlos David Fuentes Arzuaga
- Sebastián Andrés Calderón Silva

## Caso elegido

**Plato del menú de un restaurante:** nombre, precio y disponibilidad, más una descripción libre.

El componente se llama `<plato-menu>`:

```html
<plato-menu nombre="Bandeja paisa" precio="32000" disponibilidad="Disponible">
  Frijoles, arroz, chicharrón, carne molida, huevo, maduro y arepa.
</plato-menu>
```

## Estructura

| Archivo | Contenido |
|---|---|
| `README.md` | Este archivo |
| `INVESTIGACION.md` | Partes 1 y 2, con la tabla comparativa y las fuentes |
| `index.html` | El `<template>` del plato y las 3 instancias del componente |
| `js/main.js` | La clase `PlatoMenu`, comentada por requisito (R1–R5) |

## Cómo probar el componente

1. Clonar o descargar el repositorio.
2. Abrir `index.html` en el navegador (doble clic). No necesita instalar nada ni levantar un servidor.
3. Deben verse 3 tarjetas de platos con nombre, precio, disponibilidad y descripción.
4. Para revisar el Shadow DOM: abrir las herramientas de desarrollo (F12), pestaña *Elements*, y expandir cualquier `<plato-menu>` para ver su `#shadow-root (open)`.

Probado en Microsoft Edge, sin errores en la consola.

## Requisitos de la práctica

- **R1 · Template propio:** `<template id="plato-menu-template">` en `index.html`, con su `<style>` y los marcadores vacíos `.nombre`, `.precio` y `.disponibilidad`.
- **R2 · Componente:** la clase `PlatoMenu extends HTMLElement`, registrada como `plato-menu`, que clona el template dentro de su Shadow DOM.
- **R3 · Atributos:** recibe `nombre`, `precio` y `disponibilidad`, y los muestra en el template.
- **R4 · Slot:** un `<slot>` para la descripción del plato.
- **R5 · Reutilización:** la página muestra 3 platos con datos distintos.

## Declaración de uso de IA

Los dos integrantes usamos inteligencia artificial como apoyo:

- **Investigación (Partes 1 y 2):** usamos asistentes de IA, entre ellos Claude (Anthropic), para organizar las respuestas, redactar la tabla comparativa y ubicar las fuentes. Los datos de soporte de navegadores y las fuentes se verificaron en las páginas oficiales el 24/11/2026.
- **Práctica (Parte 3):** el componente `<plato-menu>` se desarrolló con apoyo de Claude (Anthropic).

Revisamos el contenido y lo podemos explicar con nuestras palabras.
