export function setup() {
  class ErrorElement extends HTMLElement {
    constructor() {
      super();
      // element created
    }

    render() {
      this.innerHTML =
        this.getAttribute("error") +
        " (X" +
        this.getAttribute("stackamt") +
        ")";
    }

    connectedCallback() {
      // browser calls this method when the element is added to the document
      // (can be called many times if an element is repeatedly added/removed)
      if (!this.rendered) {
        this.render();
        this.rendered = true;
      }
    }

    disconnectedCallback() {
      // browser calls this method when the element is removed from the document
      // (can be called many times if an element is repeatedly added/removed)
    }

    static get observedAttributes() {
      return [
        /* array of attribute names to monitor for changes */
        `error`,
        `stackamt`,
      ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      // called when one of attributes listed above is modified
      //console.log(name, oldValue, newValue);
      this.render();
    }

    adoptedCallback() {
      // called when the element is moved to a new document
      // (happens in document.adoptNode, very rarely used)
    }

    // there can be other element methods and properties
  }

  // let the browser know that <my-element> is served by our new class
  customElements.define("error-element", ErrorElement);
}
