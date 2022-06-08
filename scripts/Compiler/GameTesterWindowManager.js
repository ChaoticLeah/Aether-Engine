import { compileCurrentProject } from "./compilerManager.js";

let win;

export async function playTestGame() {
  //launch a new window and inject the game
  if (win) win.close();
  //console.log(win.closed);
  win = window.open("", "", "width=1280,height=720");
  let code = await compileCurrentProject(false);
  //download(code, "AetherEngineSave-Demo.html");
  win.document.open();
  win.document.write(code);
  win.document.close();

  //make a loop checking that its still open
  setInterval(() => {
    if (!win.closed) {
    } else {
      //cancel the interval
      clearInterval(this);
    }
  }, 1000);
}

export function sendMessageToWindow(message) {
  message.type = "fromEngine";
  win.postMessage(message, "*");
}

//send window a message to close
window.addEventListener("beforeunload", () => {
  sendMessageToWindow({ message: "close" });
});
