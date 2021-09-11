import { File } from "../../AssetPanel/file.js";
import { getFile } from "../../AssetPanel/fileManager.js";
import { propertyTypes } from "../../ObjectEditorTab/propertyTypes.js";
import { addInfoPopup, popupTypes } from "../../Popups/popupManager.js";
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
      font: "none",
      color: color,
    };
  }

  initValues() {
    if (this.properties.font == "none") return;
    if (
      getFile(this.properties.font) == undefined ||
      getFile(this.properties.font).type != File.TYPE.FONT
    ) {
      console.log(this.properties.font);
      addInfoPopup(
        "Error",
        `you tried adding a invalid file to this component`,
        popupTypes.ERROR
      );
      this.properties.font = "none";
      return;
    }
  }

  //This one is ran in the editor
  display() {
    fill(this.properties.color);

    let fontName = this.properties.font
      .replace(/ /g, "-")
      .replace(/\//g, "-")
      .replace(/\./, "-");

    //console.log(Number(this.properties.fontsize), this.properties.font);
    setFontSize(this.properties.fontsize, fontName);
    let yOffset = Number(this.properties.fontsize) * 0.8;
    if (this.parentObject.getW() < this.properties.fontsize) return;

    textWraped(
      this.properties.text,
      this.parentObject.getX(),
      this.parentObject.getY() + yOffset,
      this.parentObject.getW(),
      Number(this.properties.fontsize) * 0.8
    );
  }

  //This one isnt ran in the editor
  update() {}
}
