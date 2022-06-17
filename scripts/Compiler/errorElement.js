export function setup() {
  //create a custom html element for displaying errors
  console.log("a");

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
      this.render();
    }

    disconnectedCallback() {
      // browser calls this method when the element is removed from the document
      // (can be called many times if an element is repeatedly added/removed)
    }

    static get observedAttributes() {
      return [
        `error`,
        `stackamt` /* array of attribute names to monitor for changes */,
      ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      // called when one of attributes listed above is modified
      // set the innerHTML of the element to the new value
      this.render();
    }

    adoptedCallback() {
      // called when the element is moved to a new document
      // (happens in document.adoptNode, very rarely used)
    }

    // there can be other element methods and properties
  }

  customElements.define("error-element", ErrorElement, { extends: "div" });
}
customElements.whenDefined("error-element").then(() => {
  console.log("error-element defined");
});
