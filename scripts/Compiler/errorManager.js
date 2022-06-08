import { openFile } from "../AssetPanel/file.js";

let runType = "";

let runTypes = {
  DEBUG: "DEBUG",
  PLAY: "PLAY",
};

export function listenForErrors() {
  // event handler will listen for messages from the child
  window.addEventListener(
    "message",
    function (e) {
      if (e.data.error == undefined) return;
      let message = e.data.error.niceMessage;
      let helpMessage = e.data.error.helpMessage;
      let fileName = e.data.error.fileName;

      console.log(`${message}\n${helpMessage}
      `);

      //open the file in the editor
      if (runType == runTypes.DEBUG) {
        //TODO: it cant open the file if its not in the base folder, FIX THIS
        openFile(fileName);
        sendMessageToWindow({ message: "pause" });
      }
    },
    false
  );
}
