import { propertyTypes } from "../../ObjectEditorTab/propertyTypes.js";
import { fill, rect, setFontSize, textWraped } from "../../toolbox.js";
import { Component } from "./component.js";

export class TextComponent extends Component {
  componentName = "Text Component";
  font;
  constructor(parentObject, color) {
    super(parentObject, { color: color });
    this.objectPropertyTypes = {
      text: propertyTypes.TEXT_INPUT,
      fontsize: propertyTypes.NUMBER_INPUT,
      font: propertyTypes.FILE_INPUT,
      color: propertyTypes.COLOR_SELECT,
    };
  }

  init(parentObject, text = "", color = "#ff0000", fontsize = 12) {
    this.parentObject = parentObject;
    this.properties = {
      text: text,
      fontsize: fontsize,
      font: "default",
      color: color,
    };
  }

  initValues() {
    if (getFile(this.properties.font) == undefined) {
      addInfoPopup(
        "Error",
        `you tried adding a invalid file to this component`
      );

      return;
    }
    this.font = new FontFace("test", getFile(this.properties.image).data);
  }

  //This one is ran in the editor
  display() {
    fill(this.properties.color);
    setFontSize(this.properties.fontsize, "test");
    let yOffset = this.properties.fontsize * 0.8;

    if (this.parentObject.getW() < this.properties.fontsize) return;

    textWraped(
      this.properties.text,
      this.parentObject.getX(),
      this.parentObject.getY() + yOffset, // + this.properties.fontsize / 2
      this.parentObject.getW(),
      this.properties.fontsize * 0.8
    );
  }

  //This one isnt ran in the editor
  update() {}
}
