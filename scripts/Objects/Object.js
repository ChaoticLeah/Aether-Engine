import { CoreObjectComponent } from "./Components/coreObjectComponent.js";
import { convertToScreenCoords, getObject } from "./ObjectManager.js";
import { reloadObjectSelection } from "./ObjectsTab.js";

let idCounter = Date.now();

export let inEditor = false;
//ignore
inEditor = true
//stopIgnore

export let globalOffsetX = 0;
export let globalOffsetY = 0;

function calcMovementPer60Frames(speed) {
  return (60 / (fps | 60)) * speed;
}

export class GameObject {
  components = [];
  constructor(properties) {
    let coreObjComp = new CoreObjectComponent(this);
    if (properties.id == undefined) properties.id = (idCounter++).toString();
    if (properties.childrenObjectIds == undefined)
      properties.childrenObjectIds = [];

    coreObjComp.init(this, properties);
    this.addComponent(coreObjComp);
  }

  render() {
    if (!this.getProperties().enabled) return;

    // Render children
    this.getProperties().childrenObjectIds.forEach((child) => {
      let childObject = getObject(child);
      if (childObject) childObject.render();
    });

    for (let i = 0; i < this.components.length; i++) {
      let component = this.components[i];
      if (!inEditor) {
        component.update(this);
      }
      component.display(this);
    }
  }

  addChild(child) {
    this.getProperties().childrenObjectIds.push(child);
  }

  addChildAtIndex(child, index) {
    const childrenObjectIds = this.getProperties().childrenObjectIds;
    
    // Ensure the index is within valid bounds
    if (index >= 0 && index <= childrenObjectIds.length) {
      childrenObjectIds.splice(index, 0, child); // Insert the child at the specified index
      return true; // Child added successfully
    }
    this.addChild(child)
    return false; // Invalid index
  }

  getChildIndex(child){
    const childrenObjectIds = this.getProperties().childrenObjectIds;
    return childrenObjectIds.indexOf(child);
  }

  removeChild(child) {
    const childrenObjectIds = this.getProperties().childrenObjectIds;
    const index = childrenObjectIds.indexOf(child);
  
    if (index !== -1) {
      childrenObjectIds.splice(index, 1);
      return true; // Child removed successfully
    }
  
    return false; // Child not found
  }

  addComponent(component) {
    //if the parent object is not set then set it
    if (component.parentObject == undefined) {
      component.parentObject = this;
    }
    this.components.push(component);

    return this;
  }

  setName(name) {
    this.components[0].properties.name = name;
  }
  setSize(w, h) {
    this.components[0].properties.w = w;
    this.components[0].properties.h = h;
  }

  removeComponent(index) {
    this.components.find((component, i) => {
      if (component.componentId == index) this.components.splice(i, 1);
    });
    reloadObjectSelection();
  }

  getFirstComponent(componentName) {
    for (let i = 0; i < this.components.length; i++) {
      let component = this.components[i];
      if (component.componentName == componentName) return component;
    }
  }

  getComponent(componentName) {
    let componentsToReturn = [];
    for (let i = 0; i < this.components.length; i++) {
      let component = this.components[i];
      if (component.componentName == componentName)
        componentsToReturn.push(component);
    }
    return componentsToReturn;
  }

  getComponentById(index) {
    return this.components.find((component, i) => {
      if (component.componentId == index) return this.components[i];
    });
  }

  getX() {
    return (
      convertToScreenCoords(Number(this.components[0].properties.x), 0).x
    );
  }
  getY() {
    return (
      convertToScreenCoords(0, Number(this.components[0].properties.y)).y
    );
  }

  getCameraOffsetX(){
    return globalOffsetX
  }

  getCameraOffsetY(){
    return globalOffsetY
  }

  getParentOffsetX() {
    let parent = getObject(this.getParentObjectId())
    let parentX = 0;
    if(parent != undefined){
      parentX = parent.getGlobalOffsetWithoutCameraX()
    }
    return (
      parentX
    );
  }

  getParentOffsetY() {
    let parent = getObject(this.getParentObjectId())
    let parentY = 0;
    if(parent != undefined){
      parentY = parent.getGlobalOffsetWithoutCameraY()
    }
    return (
      parentY
    );
  }

  getGlobalOffsetWithoutCameraX() {
    return (
      this.getX() + this.getParentOffsetX()
    );
  }
  
  getGlobalOffsetWithoutCameraY() {
    return (
      this.getY() + this.getParentOffsetY()
    );
  }
  
  getGlobalOffsetX() {
    return (
      this.getGlobalOffsetWithoutCameraX() +
      globalOffsetX
    );
  }
  
  getGlobalOffsetY() {
    return (
      this.getGlobalOffsetWithoutCameraY() +
      globalOffsetY
    );
  }

  getXWithoutEditorOffset() {
    return convertToScreenCoords(Number(this.components[0].properties.x), 0).x;
  }
  getYWithoutEditorOffset() {
    return convertToScreenCoords(0, Number(this.components[0].properties.y)).y;
  }

  getXWithoutEditorOffsetScreenCoords() {
    return Number(this.components[0].properties.x);
  }
  getYWithoutEditorOffsetScreenCoords() {
    return Number(this.components[0].properties.y);
  }

  getWWithoutEditorOffsetScreenCoords() {
    return Number(this.components[0].properties.w);
  }
  getHWithoutEditorOffsetScreenCoords() {
    return Number(this.components[0].properties.h);
  }

  

  getW() {
    return convertToScreenCoords(
      0,
      0,
      Number(this.components[0].properties.w),
      0
    ).w;
  }
  getH() {
    return convertToScreenCoords(
      0,
      0,
      0,
      Number(this.components[0].properties.h)
    ).h;
  }

  getParentObjectId() {
    return this.components[0].properties.parentObjectId;
  }

  setParentObjectId(parentId){
    this.components[0].properties.parentObjectId = parentId
  }

  setX(x) {
    this.components[0].properties.x = x;
  }
  setY(y) {
    this.components[0].properties.y = y;
  }

  setW(w) {
    this.components[0].properties.w = w;
  }
  setH(h) {
    this.components[0].properties.h = h;
  }

  getProperties() {
    return this.components[0].properties;
  }

  //incrementers
  incrementX(x) {
    this.setX(
      Number(this.components[0].properties.x) + calcMovementPer60Frames(x)
    );
  }
  incrementY(y) {
    this.setY(
      Number(this.components[0].properties.y) + calcMovementPer60Frames(y)
    );
  }
  incrementW(w) {
    this.setW(
      Number(this.components[0].properties.w) + calcMovementPer60Frames(w)
    );
  }
  incrementH(h) {
    this.setH(
      Number(this.components[0].properties.h) + calcMovementPer60Frames(h)
    );
  }
}

export function setGlobalOffsetY(y) {
  globalOffsetY = y;
}

export function setGlobalOffsetX(x) {
  globalOffsetX = x;
}
