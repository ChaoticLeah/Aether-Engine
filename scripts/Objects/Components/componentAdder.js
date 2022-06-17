//ignore
import { getObject } from "../ObjectManager.js";
import { Component } from "./component.js";
import { ImageComponent } from "./imageComponent.js";
import { ParticleComponent } from "./particleComponent.js";
import { RectangleComponent } from "./rectangleComponent.js";
import { ScriptComponent } from "./scriptComponent.js";
import { TextComponent } from "./textComponent.js";
//stopignore

let components = new Map();
init();
function init() {
  components.set(Component.RectangleComponent, new RectangleComponent());
  components.set(Component.ImageComponent, new ImageComponent());
  components.set(Component.TextComponent, new TextComponent());
  components.set(Component.ScriptComponent, new ScriptComponent());
  components.set(Component.ParticleComponent, new ParticleComponent());
}

export function getComponents() {
  return Object.values(components);
}

export function getComponentsMap() {
  return components;
}

export function getComponentByName(name) {
  return Object.create(components.get(name));
}

export function addComponent(objId, componentName) {
  let component = Object.create(components.get(componentName));
  let object = getObject(objId);

  component.init(object);
  object.addComponent(component);
}
