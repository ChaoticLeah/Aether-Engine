let componentIdCounter = 0;
export class Component {
  parentObject;
  properties = {};
  objectPropertyTypes = {};
  enabled = true;
  componentId = 0;
  constructor(parentObject, properties, id = componentIdCounter++) {
    //this.parentObject = parentObject;
    this.properties = properties;
    this.componentId = id;
  }

  //This one is ran in the editor
  display() {}

  //This one isnt ran in the editor
  update() {}

  get getProperties() {
    return this.properties;
  }
  set setProperties(properties) {
    this.properties = properties;
  }

  set setParentObject(parentObject) {
    this.parentObject = parentObject;
  }
}

Component.RectangleComponent = "Rectangle Component";
Component.ImageComponent = "Image Component";
Component.TextComponent = "Text Component";
Component.ScriptComponent = "Script Component";
