//Lib name: Color.js

let totalCodeFields = document.getElementsByClassName("codeField").length;

for (let i = 0; i < totalCodeFields; i++) {
  let currentCodeField = document.getElementsByClassName("codeField")[i];
  let file = `./codeSnippets/${currentCodeField.getAttribute("script")}`;
  fetch(file)
    .then((req) => req.text())
    .then((js) => {
      currentCodeField.innerHTML = convertCode(js);
    });
}

//Color the small code snippets
totalCodeFields = document.getElementsByTagName("codeSnippet").length;

for (let i = 0; i < totalCodeFields; i++) {
  let currentCodeField = document.getElementsByTagName("codeSnippet")[i];
  console.log(currentCodeField.innerHTML);
  currentCodeField.innerHTML = convertCode(currentCodeField.innerHTML, false);
}

function convertCode(c, wrapper = true) {
  let newCode = c;
  newCode = getWordsBetweenReplace(
    c,
    `"`,
    `<span style="color:#02d045;">"</span><span style="color:#00c4c4; ">`,
    `<span style="color:#02d045;">"</span></span>`
  );

  /*newCode = newCode.replace(
    new RegExp(`"`, "g"),
    `<span style="color:#02d045;">"</span>`
  );*/
  newCode = newCode.replace(
    /function/g,
    `<span style="color:#e66170; font-weight:bold; ">function</span>`
  );

  newCode = newCode.replace(/\(/g, `<span style="color:#d2cd86; ">(</span>`);
  newCode = newCode.replace(/\)/g, `<span style="color:#d2cd86; ">)</span>`);

  newCode = newCode.replace(
    /this\./g,
    `<span style="color:#266de1; ">this</span>.`
  );
  newCode = newCode.replace(
    /return/g,
    `<span style="color:#8126e1; ">return</span>`
  );
  newCode = newCode.replace(
    /let /g,
    `<span style="color:#266de1; ">let </span>`
  );
  newCode = newCode.replace(
    /var /g,
    `<span style="color:#266de1; ">var </span>`
  );

  //Handle comments
  let code = "";
  let i = 0;
  newCode.split("\n").forEach((nc) => {
    if (nc.trim().startsWith("//")) {
      code += `<span style="color:#155100;">${c.split("\n")[i]}</span>\n`;
    } else code += nc + "\n";
    i++;
  });
  if (wrapper)
    return (
      `<pre style="color: #d1d1d1; background: #000000">` + code + `</pre>`
    );
  return code.trim() + c.charAt(c.length - 1);
}

function getWordsBetween(str, char) {
  var results = [],
    re = new RegExp(`${char}([^}]+)${char}`, "g"), ///\"([^}]+)\"/g
    text;

  while ((text = re.exec(str))) {
    results.push(text[1]);
  }
  return results;
}

function getWordsBetweenReplace(str, char, startrep, stoprep) {
  var results = [],
    lastMarker = 0,
    totalOpens = 0,
    totalCloses = 0;
  for (let i = 0; i < str.length; i++) {
    let chr = str.charAt(i);
    if (chr == char) {
      if (totalCloses == totalOpens || totalCloses > totalOpens) {
        totalOpens++;
        results.push(str.substring(lastMarker, i));
      } /*if (totalCloses < totalOpens) */ else {
        totalCloses++;
        results.push(startrep + str.substring(lastMarker, i) + stoprep);
      }
      lastMarker = i + 1;
    }
    if (i == str.length - 1) {
      results.push(str.substring(lastMarker, i));
    }
  }
  return results.join("");
}

//Add all the copy code listeners
for (let i = 0; i < document.getElementsByClassName("copyCode").length; i++) {
  let copyButton = document.getElementsByClassName("copyCode")[i];
  let file = `./codeSnippets/${copyButton.getAttribute("script")}`;
  fetch(file)
    .then((req) => req.text())
    .then((js) => {
      copyButton.onclick = function () {
        let code = js;
        copyToClipboard(js);
      };
    });
}

//Clipboard helper

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}
function copyToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}
