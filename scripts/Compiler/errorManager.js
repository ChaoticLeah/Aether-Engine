import { openFile } from "../AssetPanel/file.js";
import { EditorTab } from "../Tabs/editorTab.js";
import { addError, clearConsole } from "../Tabs/tabCode/consoleTab.js";
import { getCurrentTab, getOpenTab, openTab } from "../Tabs/tabManager.js";

let runType = "";

let runTypes = {
  DEBUG: "DEBUG",
  PLAY: "PLAY",
};

let hasErrored = false;
let errorTab;

export function resetErrorManager() {
  hasErrored = false;
}

export function listenForErrors() {
  // event handler will listen for messages from the child
  window.addEventListener(
    "message",
    function (e) {
      if (e.data.error == undefined) return;
      let message = e.data.error.niceMessage;
      let helpMessage = e.data.error.helpMessage;
      let fileName = e.data.error.fileName;

      console.log(`${message}\n${helpMessage}`);

      if (!hasErrored) {
        hasErrored = true;
        //open a new console tab
        //openTab("Console", "consoleTab");
        errorTab = new EditorTab(
          "Console",
          "consoleTab",
          true,
          undefined,
          "console_Tab"
        );

        //open the file in the editor
        if (runType == runTypes.DEBUG) {
          //TODO: it cant open the file if its not in the base folder, FIX THIS
          openFile(fileName);
          sendMessageToWindow({ message: "pause" });
        }
      }
      addError(`${message}\n${helpMessage}`);
    },
    false
  );
}
