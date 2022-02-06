class GameObject {
  options;
  components = [];
  constructor(options) {
    this.options = options;

    let coreObjComp = new CoreObjectComponent(this);
    coreObjComp.init(
      this,
      this.name,
      this.enabled,
      this.#x,
      this.#y,
      this.#w,
      this.#h
    );
    this.addComponent(coreObjComp);
  }

  addComponent(component) {
    this.components.push(component);
    return this;
  }
}
