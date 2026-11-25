Parte 1:
Qué resuelven los Web Components y qué aporta cada tecnología.
<template> frente a un <div> con display:none, comparando qué se muestra, qué se ejecuta y qué encuentra querySelector.
Shadow DOM en modo open frente a closed.
Qué es un <slot>.
Soporte de navegadores, con fuente y fecha.
Parte 2:
Las diferencias entre estándar, librería, framework y entorno de ejecución, explicadas con la analogía de una casa.
La tabla comparativa.
Node.js y npm, y qué hacen React y Node en una tienda.
Las 2 elecciones: Web Components para el botón de chat y Angular para el banco, cada una justificada.
Fuentes: 8 en total, todas oficiales o técnicas (MDN, web.dev, caniuse, react.dev, angular.dev y nodejs.org), con enlace y fecha de consulta 24/11/2026.

Revisa la tabla: el enunciado no traía sus columnas. Puse Web Components, React, Angular y Node.js, y como filas tipo, para qué sirve, ventajas, desventajas y ejemplo. Si tu profe dio otras columnas, dímelas y la ajusto.

Sobre las versiones de navegador: solo consulté los resultados de búsqueda de caniuse, que estaban algo desactualizados. Las versiones mínimas (Chrome 67+, Firefox 63+, Safari 10.1+, Edge 79+) las escribí de lo que conozco. Ábrelas en caniuse antes de entregar.

Código de ejemplo: ejemplo-web-components/

El componente es <chat-boton>, el botón de chat del caso 4a. En main.js está comentado paso a paso y usa todo lo de la clase:

Custom Element con el ciclo de vida completo y observedAttributes (empresa, color).
Shadow DOM: la página pone todos los button en rojo y a 30px, pero el chat no se afecta.
<template> que se clona con cloneNode(true) en connectedCallback.
<slot name="saludo">: Don Pepe pone su saludo y Banco Futuro usa el que viene por defecto.
CustomEvent con bubbles: true y detail: al escribir en el chat y pulsar Enter, la página recibe el mensaje.
Demos en consola:
template frente a div oculto: querySelectorAll encuentra 1 solo elemento.
open frente a closed: con closed, shadowRoot devuelve null.