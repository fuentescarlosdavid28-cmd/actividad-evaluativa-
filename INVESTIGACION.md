# Investigación: Web Components, HTML Templates y frameworks

## Parte 1 · Web Components

### 1. ¿Qué problema resuelven y qué aporta cada tecnología?

Los Web Components resuelven el problema de reutilizar piezas de interfaz (una tarjeta, un botón, un menú) sin que su HTML, CSS y JavaScript choquen con el resto de la página, y sin depender de un framework. Son un estándar del navegador, así que funcionan en cualquier página.

- **Custom Elements:** permiten crear etiquetas propias, como `<plato-menu>`, con una clase de JavaScript que extiende `HTMLElement` y define su comportamiento.
- **Shadow DOM:** le da al componente un DOM aislado. Los estilos de adentro no se filtran hacia afuera y los de la página no rompen el componente.
- **HTML Templates:** el `<template>` guarda un bloque de HTML inerte que se clona cada vez que se necesita una copia del componente.

### 2. `<template>` frente a un `<div>` con `display: none`

- **Qué se muestra:** ninguno de los dos se ve, pero por razones distintas. El `<div>` sí está en el DOM y solo está oculto con CSS. El contenido del `<template>` ni siquiera forma parte del documento activo, porque vive en un `DocumentFragment` aparte (`template.content`).
- **Qué se ejecuta:** dentro de un `<div>` oculto, las imágenes se descargan y los `<script>` se ejecutan. Dentro de un `<template>` no pasa nada hasta que el contenido se clona y se inserta en la página.
- **Qué encuentra `document.querySelector`:** encuentra los elementos dentro del `<div>` oculto, pero no los que están dentro del `<template>`. Para buscarlos hay que usar `template.content.querySelector(...)`.

### 3. Shadow DOM en modo `"open"` frente a `"closed"`

En los dos modos el contenido está encapsulado: el CSS de la página no entra y `document.querySelector` no encuentra lo que hay adentro. La diferencia es el acceso desde JavaScript externo. Con `"open"`, la propiedad `elemento.shadowRoot` devuelve la raíz de la sombra, y cualquier script puede leerla y modificarla. Con `"closed"`, `elemento.shadowRoot` devuelve `null` y solo el propio componente conserva la referencia que le devolvió `attachShadow()`. En la práctica se usa más `"open"` porque facilita depurar y probar. `"closed"` no es una medida de seguridad real; solo dificulta el acceso.

### 4. ¿Qué es un `<slot>` y para qué sirve?

Un `<slot>` es un hueco dentro del Shadow DOM donde se muestra el contenido que la persona escribe entre las etiquetas del componente. Por ejemplo, en `<plato-menu>Frijoles, arroz…</plato-menu>`, ese texto aparece donde está el `<slot>` del template. Sirve para que un mismo componente se adapte a cada caso sin cambiar su código: la estructura y el estilo son fijos, pero una parte del contenido la decide quien lo usa. Puede tener contenido por defecto (si no le pasan nada) y puede tener nombre (`<slot name="titulo">`) cuando hay varios huecos.

### 5. ¿Qué navegadores soportan hoy los Web Components?

Todos los navegadores modernos los soportan. Según Can I use (consultado el 24/11/2026), estas son las primeras versiones con soporte:

| Tecnología | Chrome | Edge | Firefox | Safari | Uso global |
|---|---|---|---|---|---|
| Custom Elements v1 | 67 | 79 | 63 | Parcial desde 10.1 | 97,37 % |
| Shadow DOM v1 | 53 | 79 | 63 | 10 | 97,37 % |
| HTML templates | 35 | 15 | 22 | 9 | 97,4 % |

Safari aparece con soporte parcial en Custom Elements porque no implementa los *customized built-in elements* (extender etiquetas nativas con `is=""`, por ejemplo `<button is="mi-boton">`). Los componentes autónomos, como `<plato-menu>`, sí funcionan en Safari. Los datos de uso son de StatCounter (octubre de 2026), tal como los muestra Can I use.

## Parte 2 · Frameworks, librerías y Node.js

### 1. Estándar, librería, framework y entorno de ejecución

Usamos el ejemplo de un menú de restaurante que se muestra en una página web:

- **Estándar del navegador:** es algo que el navegador ya trae incorporado y que funciona sin instalar nada. Por ejemplo, `customElements.define("plato-menu", PlatoMenu)` funciona en Chrome, Firefox o Safari tal cual, porque Web Components es parte de la plataforma web.
- **Librería:** es código de terceros que se llama cuando uno lo necesita, y uno sigue controlando cómo se organiza la aplicación. Por ejemplo, con React escribimos `function Plato({ nombre }) { return <h2>{nombre}</h2>; }` y decidimos nosotros cómo armar el resto (rutas, peticiones, estado).
- **Framework:** da la estructura completa y es él quien llama a nuestro código (inversión de control). Con Angular, el menú tendría que ir dentro de un componente con decorador `@Component`, en módulos, con su sistema de rutas, servicios e inyección de dependencias.
- **Entorno de ejecución:** es el programa que ejecuta el código JavaScript. El navegador es uno, y Node.js es otro que corre JavaScript fuera del navegador. Por ejemplo, un servidor en Node.js podría entregar la lista de platos y precios que la página luego muestra.

### 2. Tabla comparativa

| Criterio | Web Components nativos | React | Vue | Angular |
|---|---|---|---|---|
| **Tipo** | Estándar del navegador (conjunto de APIs: Custom Elements, Shadow DOM, templates). | Librería para construir interfaces de usuario. | Framework progresivo: se puede usar solo para la vista o crecer hasta una aplicación completa. | Framework web completo, mantenido por Google. |
| **Cómo se crea un componente** | Una clase que extiende `HTMLElement`, registrada con `customElements.define()`, normalmente con Shadow DOM y un `<template>`. | Una función de JavaScript que devuelve JSX (marcado parecido a HTML), por ejemplo `function Plato() { return <div>…</div>; }`. | Un archivo `.vue` (Single-File Component) con bloques `<template>`, `<script>` y `<style>`, o un objeto de opciones. | Una clase TypeScript con el decorador `@Component`, que indica su selector, su plantilla HTML y sus estilos. |
| **Necesita instalar herramientas (npm)** | No. Basta con un archivo HTML y uno JS en el navegador. | En la práctica sí: el JSX necesita compilarse, y se instala con npm junto con herramientas como Vite. | Opcional: se puede cargar desde un CDN, pero los archivos `.vue` y los proyectos grandes usan npm y Vite. | Sí. Se usa Angular CLI (`npm install -g @angular/cli`), y el proyecto se compila con TypeScript. |
| **Ventajas principales** | Funciona en cualquier página y con cualquier framework, no pesa nada extra y el Shadow DOM aísla los estilos. | Comunidad enorme y muchas librerías; la interfaz se actualiza sola cuando cambia el estado. | Fácil de aprender; la plantilla se parece mucho al HTML normal; tiene buena documentación en español. | Trae todo incluido (rutas, formularios, peticiones HTTP, pruebas) y su estructura obliga a que todos los equipos trabajen igual. |
| **Desventajas principales** | No trae reactividad ni manejo de estado: hay que actualizar el DOM a mano, y en aplicaciones grandes se vuelve más trabajo. | Solo resuelve la vista, así que hay que elegir otras librerías para rutas o estado; además requiere compilación. | Su ecosistema es más pequeño que el de React y hay menos ofertas laborales en algunas regiones. | Curva de aprendizaje alta (TypeScript, decoradores, inyección de dependencias) y es pesado para proyectos pequeños. |

### 3. Node.js, npm y la tienda en línea

Node.js es un **entorno de ejecución** de JavaScript: permite correr JavaScript fuera del navegador, por ejemplo en un servidor o en la terminal. No es un framework ni una librería. Se usa para crear servidores y APIs, scripts y herramientas de desarrollo.

npm es el gestor de paquetes que viene con Node.js. React, Vue y Angular se publican como paquetes en el registro de npm, y con npm se instalan junto con sus herramientas (Vite, Angular CLI, compiladores). Por eso, aunque React corra en el navegador, para desarrollarlo se necesita tener Node.js instalado.

En una tienda en línea, **React** construye lo que ve el cliente en el navegador: el catálogo, el carrito y el formulario de pago. **Node.js** corre en el servidor: recibe las peticiones, consulta la base de datos de productos, procesa los pedidos y responde con los datos que React luego muestra.

### 4. ¿Qué herramienta usaríamos?

**a. Un botón de chat que varias empresas pegan en sus propias páginas → Web Components nativos.**
Cada empresa usa una tecnología distinta (React, WordPress, Angular o HTML puro), y un Web Component funciona en todas porque es un estándar del navegador. Basta con pegar un `<script>` y la etiqueta `<chat-boton>`. El Shadow DOM evita que el CSS de la página del cliente desarme el botón, y al no depender de una librería, no carga peso extra ni entra en conflicto de versiones con el framework que use cada empresa.

**b. Una aplicación web grande para un banco, con muchos equipos → Angular.**
Angular trae una estructura fija (componentes, servicios, módulos y rutas) que todos los equipos deben seguir, así que el código se ve igual aunque lo escriban personas distintas. Incluye de fábrica formularios con validación, cliente HTTP, rutas y herramientas de pruebas, sin depender de elegir librerías externas. Además, TypeScript detecta errores antes de ejecutar, algo importante en un sistema que maneja dinero y que se mantendrá por muchos años.

## Fuentes

Todas consultadas el **24/11/2026**.

1. MDN Web Docs. *Web Components - Web APIs*. https://developer.mozilla.org/en-US/docs/Web/API/Web_components
2. MDN Web Docs. *`<template>`: The Content Template element*. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
3. MDN Web Docs. *Using shadow DOM*. https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM
4. MDN Web Docs. *Using templates and slots*. https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots
5. Can I use. *Custom Elements (V1)*. https://caniuse.com/custom-elementsv1
6. Can I use. *Shadow DOM (V1)*. https://caniuse.com/shadowdomv1
7. Can I use. *HTML templates*. https://caniuse.com/template
8. React (documentación oficial). *Quick Start*. https://react.dev/learn
9. Vue.js (documentación oficial). *Introduction*. https://vuejs.org/guide/introduction.html
10. Angular (documentación oficial). *What is Angular?* https://angular.dev/overview
11. Node.js (sitio oficial). *About Node.js*. https://nodejs.org/en/about
12. npm Docs. *About npm*. https://docs.npmjs.com/about-npm
