import { File } from "../../AssetPanel/file.js";
import { getFile } from "../../AssetPanel/fileManager.js";
import { propertyTypes } from "../../ObjectEditorTab/propertyTypes.js";
import { addInfoPopup, popupTypes } from "../../Popups/popupManager.js";
import { fill, rect, renderImage } from "../../toolbox.js";
import { Component } from "./component.js";

export class ScriptComponent extends Component {
  componentName = Component.ScriptComponent || "Script Component";
  constructor(parentObject, script) {
    if (typeof script != "object") script = { script: script };

    super(parentObject, script);
    this.objectPropertyTypes = {
      script: propertyTypes.FILE_INPUT,
    };
  }

  init(parentObject, script = "") {
    this.parentObject = parentObject;
    this.properties = { script: script };
    this.parseScriptForExports();
  }

  getType(value) {
    if (!isNaN(value)) {
      return propertyTypes.NUMBER_INPUT;
    } else if (value === "true" || value === "false") {
      return propertyTypes.TOGGLE_INPUT;
    } else if (/^['"](.+)['"]$/.test(value)) {
      return propertyTypes.TEXT_INPUT;
    } else {
      return undefined;
    }
  }

  parseScriptForExports() {
    const scriptResource = getFile(this.properties.script)
    if(scriptResource == undefined) return
    let fileData = scriptResource.rawData;

    // Regular expression to match exported variable declarations
    const exportRegex = /\bexport\s+let\s+(\w+)\s*=\s*(.*?);/g; ///\bexport\s+let\s+(\w+)\s*=/g;

    // Array to store matched variable names
    let exportedVars = [];

    // Match the regular expression in the fileData
    let match;
    while ((match = exportRegex.exec(fileData)) !== null) {
      // The first capturing group (match[1]) contains the variable name

      this.objectPropertyTypes[match[1]] = this.getType(match[2])
      this.properties[match[1]] = match[2]

      exportedVars.push({
        varName: match[1],
        value: match[2],
      });
    }

    // Log or use the exported variable names as needed
    console.log("Exported variables:", exportedVars);
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
    this.parseScriptForExports();
  }
}
