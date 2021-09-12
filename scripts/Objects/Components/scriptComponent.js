import { File } from "../../AssetPanel/file.js";
import { getFile } from "../../AssetPanel/fileManager.js";
import { propertyTypes } from "../../ObjectEditorTab/propertyTypes.js";
import { addInfoPopup, popupTypes } from "../../Popups/popupManager.js";
import { fill, rect, renderImage } from "../../toolbox.js";
import { Component } from "./component.js";

export class ScriptComponent extends Component {
  componentName = Component.ScriptComponent;

  constructor(parentObject, script) {
    super(parentObject, { script: script });
    this.objectPropertyTypes = {
      script: propertyTypes.FILE_INPUT,
    };
  }

  init(parentObject, script = "") {
    this.parentObject = parentObject;
    this.properties = { script: script };
  }

  initValues() {
    if (this.properties.script == "") return;
    if (
      getFile(this.properties.script) == undefined ||
      getFile(this.properties.script).type != File.TYPE.SCRIPT
    ) {
      addInfoPopup(
        "Error",
        `you tried adding a invalid file to this component`,
        popupTypes.ERROR
      );

      return;
    }
  }

  //This one is ran in the editor
  display() {}

  //This one isnt ran in the editor
  update() {}
}
