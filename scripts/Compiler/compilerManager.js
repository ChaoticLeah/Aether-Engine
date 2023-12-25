import { getObjects } from "../Objects/ObjectManager.js";
import { getAssetsAsJSON } from "../SaveProject/assetDataJSONifyer.js";
import { loadImg, readTextFile } from "../toolbox.js";

function removeOutterLetsAndVars(str) {
  let lines = str.split("\n"),
    inFunc = false,
    open = 0,
    close = 0,
    finalString = "";

  lines.forEach((l) => {
    if (l.includes("function")) {
      inFunc = true;
    }
    if (l.includes("{")) {
      open++;
    }

    if (l.includes("}")) {
      close++;
      if (close == open) {
        inFunc = false;
      }
    }
    if (inFunc) finalString += l + "\n";
    else finalString += (l + "\n").replace(/var /g, "").replace(/let /g, "");
  });

  return finalString;
}

function removeComments(str, shouldRemove) {
  if (!shouldRemove) return str;
  //remove the double slash comments from the code
  str = str.replace(/\/\/.*/g, "");
  //remove the single slash comments from the code
  str = str.replace(/\/\*[\s\S]*?\*\//g, "");
  return str;
}

function removeImports(str) {
  str = str.replace(/import.*/g, "");
  return str;
}
//for making the file smaller
function removeUnusedFunctions(str) {
  //locate all the function names
  let funcNames = str.match(/function.*?\(/g);

  for (let fname of funcNames) {
    //remove the function name from the string
    fname = fname.replace("function ", "").replace("(", "");

    //test to see how many uses the function has
    let uses = str.match(new RegExp(fname, "g"));

    if (uses.length < 2) {
      //if the function is unused, remove it
      str = str.replace(new RegExp(fname, "g"), "");
    }
  }
  return str;
}

function removeFunctionsWithIgnoreComment(str) {
  //scan mutiple lines until you find the stop ignoring comment
  let lines = str.split("\n");
  let ignore = false;
  let finalString = "";
  lines.forEach((l) => {
    l = l.trim();
    if (l.includes("//ignore")) {
      ignore = true;
    }
    if (l.includes("//stopIgnore")) {
      ignore = false;
    }
    if (!ignore) {
      finalString += l + "\n";
    }
  });
  return finalString;
}

function removeFunctionsWithProductionIgnoreComment(str, shouldRemove) {
  //scan mutiple lines until you find the stop ignoring comment
  let lines = str.split("\n");
  let ignore = false;
  let finalString = "";

  lines.forEach((l) => {
    l = l.trim();
    if (l.includes("//ignoreForProduction")) {
      if (shouldRemove) ignore = true;
    }
    if (l.includes("//stopIgnoreForProduction")) {
      ignore = false;
    }
    if (!ignore) {
      finalString += l + "\n";
    }
  });
  return finalString;
}

function replaceRenderCode(str) {
  //replace the fill with renderer.fill and the rect with renderer.rect
  str = str.replace(/fill\(/g, "renderer.fill(");
  str = str.replace(/rect\(/g, "renderer.rect(");
  str = str.replace(/renderImage\(/g, "renderer.image(");
  str = str.replace(/setFontSize\(/g, "renderer.setFontSize(");
  str = str.replace(/textWraped\(/g, "renderer.textWrapped(");
  return str;
}

export async function compileCurrentProject(isProduction = true) {
  let compiledCode = ``;

  let objects = getObjects();
  let assetsJSON = getAssetsAsJSON(true);
  let assetNames = Object.keys(assetsJSON);

  let compiledAssets = ``;
  //Add the assets to the compiled code
  for (let assetName of assetNames) {
    if (assetsJSON[assetName].type == "text/javascript") {
      let scriptName = assetsJSON[assetName].file.directory
        .replace(/\//g, "_")
        .replace(/\./, "$");
      //add the scripts to the compiled code
      let finalScript =
        `class ${scriptName} {
          componentName = Component.ScriptComponent 
        constructor() {}
          hasInited = false;
          type = "script";
          ` +
        removeComments(
          removeOutterLetsAndVars(assetsJSON[assetName].rawData),
          isProduction
        ).replace(/function /g, "") +
        `display(parent){

          ${
            assetsJSON[assetName].file.rawData.includes("function onStart")
              ? `          if(!this.hasInited){
                this.onStart(parent);
                this.hasInited = true;
              }`
              : ""
          } 


          ${
            assetsJSON[assetName].file.rawData.includes("function update")
              ? "this.update(parent);}"
              : "}"
          } 
      
      }\n`;

      compiledAssets += finalScript;
    } else {
      //add all the other assets to the compiled code
      compiledAssets += `  setAsset("${assetsJSON[assetName].file.directory}", new ${assetsJSON[assetName].file.constructor.name}("${assetsJSON[assetName].file.rawData}"));  `;
    }
  }
  //add the compiled assets to the compiled code
  compiledCode += `\n${compiledAssets}\n`;

  //Add the objects to the compiled code
  for (let object of objects) {
    let objectId = object[0];
    object = object[1];
    let parentObjectId = object.parentObjectId;
    let objectEnabled = object.enabled;
    let objectName = object.name;
    let objectComponents = object.components;
    let coreComponent;
    let componentCreator = "";
    //loop though the objects components
    for (let component of objectComponents) {
      let componentData = JSON.stringify(component.properties);

      if (component.constructor.name == "CoreObjectComponent") {
        coreComponent = componentData;
      } else if (component.constructor.name == "ScriptComponent") {
        let script = component.properties.script;
        let scriptName = script.replace(/\//g, "_").replace(/\./, "$");

        console.log(scriptName);
        componentCreator += `.addComponent(new ${scriptName}())`;
      } else
        componentCreator += `.addComponent(new ${component.constructor.name}(null, ${componentData}))`;
    }

    let objectCreator = `new GameObject(${coreComponent})${componentCreator}`;

    //add the object to the compiled code
    compiledCode += `objects.set("${objectId}", ${objectCreator});\n`;
  }

  //add the assets
  let baseCodeLib = removeFunctionsWithProductionIgnoreComment(
    removeFunctionsWithIgnoreComment(
      await readTextFile("./scripts/Compiler/Dependencies/baseDep.js")
    ),
    isProduction
  );

  //Get those dependencies and put it all together
  let dependencies = await readTextFile(
    "./scripts/Compiler/Dependencies/depList.txt"
  );
  dependencies = await dependencies
    .replace(/\r/g, "")
    .split("\n")
    .filter((l) => !l.startsWith("//") && l.length > 0);

  //add all the dependencies to the compiled code
  let dependenciesCode = ``;
  for (let dep of dependencies) {
    dependenciesCode += `\n${replaceRenderCode(
      removeImports(
        removeFunctionsWithProductionIgnoreComment(
          removeFunctionsWithIgnoreComment(await readTextFile(`./${dep}`)),
          isProduction
        )
      ).replace(/export /g, "")
    )}`;
  }

  baseCodeLib = baseCodeLib.replace("//DEPENDENCIES HERE", dependenciesCode);
  console.log(dependencies);

  baseCodeLib = baseCodeLib.replace("//INITIALIZATION HERE", compiledCode);
  //baseCode = baseCode.replace("//LOOP HERE", "loop();");

  let templateHTMLFile = await readTextFile(
    "./scripts/Compiler/Dependencies/baseDep.html"
  );
  templateHTMLFile = templateHTMLFile.replace("//CODE HERE", baseCodeLib);

  //add credit comment
  templateHTMLFile += `\n<!-- Created with the Aether Engine -->`;

  return templateHTMLFile;

  let otherDependencies = await readTextFile(
    "./Dependencies/depList.txt"
  ).split("\n");
  //add all the dependencies
  for (let dep of otherDependencies) {
    let depCode = await readTextFile(`./Dependencies/${dep}`);
    compiledCode += depCode;
  }

  //add the assets
  let baseCode = await readTextFile("./Dependencies/baseDep.js");

  baseCode = baseCode.replace(
    "//INITIALIZATION HERE",
    `assets = ${assetsJSON}`
  );

  //add the objects
  let objCode = await readTextFile(`./Objects/Object.js`);
}
