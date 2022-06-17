import { setup } from "../../Compiler/errorElement.js";
setup();
export let consoleTab = {
  init: () => {},
  loop: (tick, selectedObject) => {},
  onChange: (tabId, tabName, extraData) => {
    //TODO: LOAD THE PROJECT SETTINGS and display them

    document.getElementById("consoleTab").style.display = "inline";
  },
  onLeave: (tabId, tabName, extraData) => {
    document.getElementById("consoleTab").style.display = "none";
  },

  clearConsole: () => {
    document.getElementById("consoleHolder").innerHTML = "";
  },
};

export function addError(error) {
  let consoleHolder = document.getElementById("consoleHolder");

  //check the last child to see if its the same error, then add a xamt to it
  if (
    consoleHolder.lastChild != null &&
    consoleHolder.lastChild.innerText == error
  ) {
    consoleHolder.lastChild.setAttribute(
      "stackamt",
      parseInt(consoleHolder.lastChild.getAttribute("stackamt")) + 1
    );

    return;
  }

  let errorElement = document.createElement("error-element");
  errorElement.classList.add("consoleError");
  errorElement.setAttribute("error", error);
  consoleHolder.appendChild(errorElement);
}
