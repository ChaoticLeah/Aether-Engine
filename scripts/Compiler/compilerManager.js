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

function removeComments(str) {
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
    if (uses < 2) {
      //if the function is unused, remove it
      str = str.replace(new RegExp(fname, "g"), "");
    }
  }
  return str;
}

export async function compileCurrentProject() {
  let compiledCode = ``;

  let objects = getObjects();
  let assetsJSON = getAssetsAsJSON(true);
  let assetNames = Object.keys(assetsJSON);

  let compiledAssets = ``;
  //Add the assets to the compiled code
  for (let assetName of assetNames) {
    if (assetsJSON[assetName].type == "text/javascript") {
      //add the scripts to the compiled code
      let finalScript =
        `class ${assetsJSON[assetName].file.directory
          .replace(/\//g, "_")
          .replace(/\./, "_")} { type = "script";` +
        removeComments(
          removeOutterLetsAndVars(assetsJSON[assetName].rawData)
        ).replace(/function /g, "") +
        `run(parent){${
          assetsJSON[assetName].file.rawData.includes("function update")
            ? "this.update(parent);}"
            : ""
        } }\n`;

      compiledAssets += finalScript;
    } else {
      //add all the other assets to the compiled code
      compiledAssets += `  assets.set("${assetsJSON[assetName].file.directory}", new ${assetsJSON[assetName].file.constructor.name}("${assetsJSON[assetName].file.rawData}"));  `;
    }
  }
  //add the compiled assets to the compiled code
  compiledCode += `let assets = new Map();\n${compiledAssets}\n`;

  //Add the objects to the compiled code
  for (let object of objects) {
    let objectId = object[0];
    object = object[1];
    let parentObjectId = object.parentObjectId;
    let objectEnabled = object.enabled;
    let objectName = object.name;
    let objectComponents = object.components;
    let objectCreator = `new GameObject({"id": "${objectId}", "parentObjectId": "${parentObjectId}", "enabled": ${objectEnabled}, "name": "${objectName}"})`;

    //loop though the objects components
    for (let component of objectComponents) {
      let componentData = JSON.stringify(component.properties);
      objectCreator += `.addComponent(new ${component.constructor.name}(${componentData}))`;
    }
    //add the object to the compiled code
    compiledCode += `objects.set("${objectId}", ${objectCreator});\n`;
  }

  //add the assets
  let baseCodeLib = await readTextFile(
    "./scripts/Compiler/Dependencies/baseDep.js"
  );

  //Get those dependencies and put it all together
  let dependencies = await readTextFile(
    "./scripts/Compiler/Dependencies/depList.txt"
  );
  dependencies = await dependencies
    .replace(/\r/g, "")
    .split("\n")
    .filter((l) => !l.startsWith("//"));

  //add all the dependencies to the compiled code
  let dependenciesCode = ``;
  for (let dep of dependencies) {
    dependenciesCode += `\n${removeImports(
      await readTextFile(`./${dep}`)
    ).replace(/export /g, "")}`;
  }

  baseCodeLib = baseCodeLib.replace("//DEPENDENCIES HERE", dependenciesCode);

  baseCodeLib = baseCodeLib.replace("//INITIALIZATION HERE", compiledCode);
  //baseCode = baseCode.replace("//LOOP HERE", "loop();");

  let templateHTMLFile = await readTextFile(
    "./scripts/Compiler/Dependencies/baseDep.html"
  );
  templateHTMLFile = templateHTMLFile.replace("//CODE HERE", baseCodeLib);

  console.log(templateHTMLFile);

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
