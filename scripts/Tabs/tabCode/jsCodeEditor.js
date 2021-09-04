export let jsCodeEditor = {
  init: () => {},
  loop: (tick) => {},
  onChange: (tabId, tabName, extraData) => {
    document.getElementById("codeWrapper").style.display = "inline";
    if (extraData != undefined) {
      setCode(extraData);
    }
  },
  onLeave: (tabId, tabName, extraData) => {
    document.getElementById("codeWrapper").style.display = "none";
  },
};

export function getCode() {
  return document
    .getElementsByClassName("CodeMirror")[0]
    .CodeMirror.getDoc()
    .getValue("\n");
}

export function setCode(str) {
  document.getElementsByClassName("CodeMirror")[0].CodeMirror.setValue(str);
}
