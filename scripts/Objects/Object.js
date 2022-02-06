import { CoreObjectComponent } from "./Components/coreObjectComponent.js";
import { convertToScreenCoords, getObject } from "./ObjectManager.js";
import { reloadObjectSelection } from "./ObjectsTab.js";

let idCounter = 0;
export let inEditor = true;

export let globalOffsetX = 0;
export let globalOffsetY = 0;

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
      this.#x,
      this.#y,
      this.#w,
      this.#h
    );
    this.addComponent(coreObjComp);
  }

  render() {
    if (!this.enabled) return;

    // Render children
    this.childrenObjectIds.forEach((child) => {
      let childObject = getObject(child);
      if (childObject) childObject.render();
    });

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

  setCoreComponentValues(name, enabled, x, y, w, h) {
    this.components[0].init(this, name, enabled, x, y, w, h);
  }

  setName(name) {
    this.name = name;
    this.components[0].properties.name = name;
  }
  setSize(w, h) {
    this.#w = w;
    this.components[0].properties.w = w;

    this.#h = h;
    this.components[0].properties.h = h;
  }

  removeComponent(index) {
    this.components.find((component, i) => {
      if (component.componentId == index) this.components.splice(i, 1);
    });
    reloadObjectSelection();
  }

  getX() {
    return convertToScreenCoords(Number(this.#x), 0).x + globalOffsetX;
  }
  getY() {
    return convertToScreenCoords(0, Number(this.#y)).y + globalOffsetY;
  }

  getXWithoutEditorOffset() {
    return convertToScreenCoords(Number(this.#x), 0).x;
  }
  getYWithoutEditorOffset() {
    return convertToScreenCoords(0, Number(this.#y)).y;
  }

  getXWithoutEditorOffsetScreenCoords() {
    return Number(this.#x);
  }
  getYWithoutEditorOffsetScreenCoords() {
    return Number(this.#y);
  }

  getW() {
    return convertToScreenCoords(0, 0, Number(this.#w), 0).w;
  }
  getH() {
    return convertToScreenCoords(0, 0, 0, Number(this.#h)).h;
  }

  getParentObjectId() {
    return this.parentObjectId;
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

export function setGlobalOffsetY(y) {
  globalOffsetY = y;
}

export function setGlobalOffsetX(x) {
  globalOffsetX = x;
}
