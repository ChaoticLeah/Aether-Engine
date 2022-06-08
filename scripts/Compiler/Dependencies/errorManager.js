//ignoreForProduction

function sendMessageToParent(message) {
  window.opener.postMessage(message, "*");
}

function sendError(error) {
  const lineCol = error.stack.split("\n")[0].split("injectedScript:")[1];
  const line = Number(lineCol.split(":")[0]) - 3;
  const col = Number(lineCol.split(":")[1]) - 1;
  const parentDoc = document.documentElement.outerHTML;
  const parentDocLines = parentDoc.split("\n");
  const classNameLine = findClass(parentDocLines, line);
  let endOfClassLine = findEndOfClass(parentDocLines, classNameLine);
  const className = parentDocLines[classNameLine].split(" ")[1];
  const fileName = className.replace("_", "/").replace("$", ".");
  const closestFuncLine = findClosestFunc(parentDocLines, line, classNameLine);

  //make the class joined lines from parentDocLines to endOfClassLine
  // let classLines = parentDocLines
  //   .slice(classNameLine, endOfClassLine + 1)
  //   .join("\n");

  let closestFunc = parentDoc
    .split("\n")
    [closestFuncLine].split("(parent)")[0]
    .trim();
  let actualLineNumber = line - classNameLine - 4;

  let niceMessage = `(${fileName}) ${error.message} in function ${closestFunc} line ${actualLineNumber}:${col}`;

  let helpMessage = getExtraHelp(error.message, className);

  sendMessageToParent({
    type: "error",
    error: {
      message: error.message,
      stack: error.stack,
      fileName: fileName,
      niceMessage: niceMessage,
      helpMessage: helpMessage,
    },
    document: document.documentElement.outerHTML,
  });
}

function getErrorClassInstance(scriptName) {
  //look through the whole document for the class in a map
  //split the document into lines
  let lines = document.documentElement.outerHTML.split("\n");
  let scriptComponentLineNumber = 0;
  //loop through the lines
  for (let i = 0; i < lines.length; i++) {
    //if the line starts with the class name
    if (lines[i].includes(`.addComponent(new ${scriptName}`)) {
      //return the line
      scriptComponentLineNumber = i;
    }
  }
  const objectId = lines[scriptComponentLineNumber].split('"')[1];
  const componentNumber = getComponentNumber(
    lines[scriptComponentLineNumber],
    scriptName
  );
  const object = getObject(objectId);

  return object.components[componentNumber];
}

function getComponentNumber(objectAddLine, componentClassName) {
  let components = objectAddLine.split(".addComponent(new ");
  //loop through each one and check if it is the component we are looking for
  for (let i = 0; i < components.length; i++) {
    if (components[i].startsWith(componentClassName)) {
      return i;
    }
  }
}

function getExtraHelp(message, scriptName) {
  //console.log(message, classCode);
  let errorScriptClass = getErrorClassInstance(scriptName);
  let returnVal = "";
  if (message.includes("SyntaxError: Unexpected token")) {
    returnVal = "Did you forget to close a tag?";
  }
  //console.log(message);
  if (message.includes(" is not defined")) {
    let isMissingThis = false;
    try {
      if (
        eval(`typeof errorScriptClass.${message.split(" ")[0]}`) != "undefined"
      )
        isMissingThis = true;
    } catch (error) {}
    if (isMissingThis) {
      returnVal = `Suggested Fix: Use this.${
        message.split(" ")[0]
      } instead of just ${message.split(" ")[0]}`;
    } else returnVal = `Did you forget/Misspell to declare a variable?`;
  }
  if (message.includes("is not a function")) {
    const varName = message.split(" ")[0].split(".")[1];
    returnVal = `${varName} is a ${eval(
      `typeof errorScriptClass.${varName}`
    )}, not a function.`;
  }

  returnVal += ``;

  return returnVal;
}

function findClass(arr, index) {
  //loop backwards from the index to find the first mention of the class
  for (let i = index; i >= 0; i--) {
    if (arr[i].includes("class")) {
      return i;
    }
  }
}

function findEndOfClass(arr, index) {
  //loop forwards from the index to find "this.update(parent);"
  for (let i = index; i < arr.length; i++) {
    if (arr[i].includes("this.update(parent);}")) {
      return i;
    }
  }
}

function findClosestFunc(arr, searchStart, searchEnd) {
  //iterate backwards from the searchStart to find the first mention of a function
  for (let i = searchStart; i > searchEnd; i--) {
    if (arr[i].includes("(parent) {")) {
      return i;
    }
  }
}

window.addEventListener(
  "message",
  function (e) {
    if (e.data.type == "fromEngine") {
      //check if its a message to pause
      if (e.data.message == "pause") {
        //pause the game
        paused = true;
      } else if (e.data.message == "resume") {
        //resume the game
        paused = false;
      } else if (e.data.message == "close") {
        //close the window
        window.close();
      }
      //sendError(e.data.error);
    }
  },
  false
);

//stopIgnoreForProduction
