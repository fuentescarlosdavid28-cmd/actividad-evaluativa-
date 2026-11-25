// R2
class PlatoMenu extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById("plato-menu-template");
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // R3
  connectedCallback() {
    const nombre = this.getAttribute("nombre") ?? "";
    const precio = Number(this.getAttribute("precio") ?? 0);
    const disponibilidad = this.getAttribute("disponibilidad") ?? "";

    this.shadowRoot.querySelector(".nombre").textContent = nombre;
    this.shadowRoot.querySelector(".precio").textContent =
      "$" + precio.toLocaleString("es-CO");
    this.shadowRoot.querySelector(".disponibilidad").textContent = disponibilidad;
  }
}

customElements.define("plato-menu", PlatoMenu);
