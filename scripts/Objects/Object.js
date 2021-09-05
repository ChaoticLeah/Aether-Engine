import { CoreObjectComponent } from "./Components/coreObjectComponent.js";
import { reloadObjectSelection } from "./ObjectsTab.js";

let idCounter = 0;
export let inEditor = true;
export class GameObject {
  name = "Object";
  enabled = true;

  id;
  #x = 0;
  #y = 0;
  #w = 10;
  #h = 10;
  parentObjectId = undefined;

  components = [];
  childrenObjectIds = [];
  constructor(x, y, w, h) {
    this.#x = x;
    this.#y = y;
    this.#w = w;
    this.#h = h;
    this.id = idCounter++;
    let coreObjComp = new CoreObjectComponent(this);
    coreObjComp.init(
      this,
      this.name,
      this.enabled,
      this.getX(),
      this.#y,
      this.#w,
      this.#h
    );
    this.addComponent(coreObjComp);
  }

  render() {
    if (!this.enabled) return;
    for (let i = 0; i < this.components.length; i++) {
      let component = this.components[i];
      if (!inEditor) {
        component.update();
      }
      component.display();
    }
  }

  addChild(child) {
    this.childrenObjectIds.push(child);
  }

  addComponent(component) {
    this.components.push(component);
  }

  removeObject(index) {
    this.components.splice(index, 1);
    reloadObjectSelection();
  }

  getX() {
    return this.#x;
  }
  getY() {
    return this.#y;
  }
  getW() {
    return this.#w;
  }
  getH() {
    return this.#h;
  }

  setX(x) {
    this.#x = x;
  }
  setY(y) {
    this.#y = y;
  }
  setW(w) {
    this.#w = w;
  }
  setH(h) {
    this.#h = h;
  }
}
