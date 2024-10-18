export class SelectMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        const template = document.querySelector('#select-menu-template');
        this.shadowRoot.appendChild(template);

        this.selectValue = this.shadowRoot.querySelector('.select-value');
        // console.log(template);
        this.optionList = this.shadowRoot.querySelector('.options-list');
    }
    onClick(callback) {
        // toggle and do anything general then execute the custom callback
    }
    connectedCallback() {

    }
}

customElements.define('select-menu', SelectMenu);
