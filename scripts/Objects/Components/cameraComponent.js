import { propertyTypes } from "../../ObjectEditorTab/propertyTypes.js";
import { GameObject, setGlobalOffsetX, setGlobalOffsetY } from "../Object.js";
import { Component } from "./component.js";

export class CameraComponent extends Component {
  componentName = "Camera Component";

  constructor(parentObject, data = {}) {
    super(parentObject, data);
  }
  /**
   * 
   * @param {GameObject} parentObject 
   * @param {*} properties 
   */
  init(parentObject, properties) {
    this.parentObject = parentObject;
    this.properties = properties;
  }

  initValues() {

  }

  //This one is ran in the editor
  display() {
    //console.log("pog")
    //setGlobalOffsetX(this.parentObject.getGlobalOffsetX())
    //setGlobalOffsetY(this.parentObject.getGlobalOffsetY())
  }

  //This one isnt ran in the editor
  update(){
    console.log(this.parentObject.getGlobalOffsetWithoutCameraX())
    setGlobalOffsetX(-this.parentObject.getGlobalOffsetWithoutCameraX())
    setGlobalOffsetY(-this.parentObject.getGlobalOffsetWithoutCameraY())
  }
}
