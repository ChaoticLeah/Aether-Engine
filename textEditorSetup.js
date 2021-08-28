var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  lineNumbers: true,
  extraKeys: { "Ctrl-Space": "autocomplete" },
  mode: { name: "javascript", globalVars: true },
  gutters: ["CodeMirror-lint-markers"],
  lint: true,
  autoCloseBrackets: true,
  lint: {
    esversion: 6,
  },
  //The theme for the code editor
  theme: "ayu-mirage",
});

/*
var widgets = [];
function updateHints() {
  editor.operation(function () {
    for (var i = 0; i < widgets.length; ++i)
      editor.removeLineWidget(widgets[i]);
    widgets.length = 0;

    JSHINT(editor.getValue());
    for (var i = 0; i < JSHINT.errors.length; ++i) {
      var err = JSHINT.errors[i];
      if (!err) continue;
      var msg = document.createElement("div");
      var icon = msg.appendChild(document.createElement("span"));
      icon.innerHTML = "!!";
      icon.className = "lint-error-icon";
      msg.appendChild(document.createTextNode(err.reason));
      msg.className = "lint-error";
      widgets.push(
        editor.addLineWidget(err.line - 1, msg, {
          coverGutter: false,
          noHScroll: true,
        })
      );
    }
  });
  var info = editor.getScrollInfo();
  var after = editor.charCoords(
    { line: editor.getCursor().line + 1, ch: 0 },
    "local"
  ).top;
  if (info.top + info.clientHeight < after)
    editor.scrollTo(null, after - info.clientHeight + 3);
}

window.onload = function () {
  var waiting;
  editor.on("change", function () {
    clearTimeout(waiting);
    waiting = setTimeout(updateHints, 500);
  });

  setTimeout(updateHints, 100);
};*/

//while (true) {
//}

/*
if (typeof Promise !== "undefined") {
  var comp = [
    ["here", "hither"],
    ["asynchronous", "nonsynchronous"],
    ["completion", "achievement", "conclusion", "culmination", "expirations"],
    ["hinting", "advive", "broach", "imply"],
    ["function", "action"],
    ["provide", "add", "bring", "give"],
    ["synonyms", "equivalents"],
    ["words", "token"],
    ["each", "every"],
  ];

  function synonyms(cm, option) {
    return new Promise(function (accept) {
      setTimeout(function () {
        var cursor = cm.getCursor(),
          line = cm.getLine(cursor.line);
        var start = cursor.ch,
          end = cursor.ch;
        while (start && /\w/.test(line.charAt(start - 1))) --start;
        while (end < line.length && /\w/.test(line.charAt(end))) ++end;
        var word = line.slice(start, end).toLowerCase();
        for (var i = 0; i < comp.length; i++)
          if (comp[i].indexOf(word) != -1)
            return accept({
              list: comp[i],
              from: CodeMirror.Pos(cursor.line, start),
              to: CodeMirror.Pos(cursor.line, end),
            });
        return accept(null);
      }, 100);
    });
  }

  var editor2 = CodeMirror.fromTextArea(document.getElementById("synonyms"), {
    extraKeys: { "Ctrl-Space": "autocomplete" },
    lineNumbers: true,
    lineWrapping: true,
    mode: "text/x-markdown",
    hintOptions: { hint: synonyms },
  });
}*/
