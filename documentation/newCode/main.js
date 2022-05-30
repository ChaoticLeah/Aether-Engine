import { convert } from "./syntaxHighlighter.js";

//get the url and everything past the #
var url = window.location.hash.split("#")[1];

//read the docs.json

function findDocs(pages, name) {
  console.log("Looking for docs: " + name);

  if (name == undefined) {
    name = "Home";
  }

  var docs = pages;
  for (var i = 0; i < pages.length; i++) {
    if (docs[i].Name.replace(" ", "-") == name) {
      return docs[i];
    }
  }
}
/**
 *
 * @param {Array} text
 */
function turnJSONToHTML(text) {
  for (var i = 0; i < text.length; i++) {
    let type = text[i].type;
    let value = text[i].value;
    if (type == "script-preview") {
      value = `<div id="scriptHolder">
      <h3>
          script.js
          <button class="copyCode" script="${value.script}">Copy</button>
      </h3>
      <div class="codeField" script="${value.script}"></div>
      <div>
      <iframe src="${value.result}" width="100%" height="500" frameborder="0" title="rainbowCube"></iframe>
      </div>
  </div>`;
    }

    value = value.replace(/\n/g, "<br>");
    if (type == "title") {
      value = "<h2>" + value + "</h2>";
    }
    if (type == "paragraph") {
      value = `<p class="desc">` + value + `</p>`;
    }
    if (type == "script") {
      value = `<div id="scriptHolder">
      <h3>
          script.js
          <button class="copyCode" script="${value}">Copy</button>
      </h3>
      <div class="codeField" script="${value}"></div>
  </div>`;
    }

    //add the html to the page
    document.getElementById("content").innerHTML += value;
  }
}

var docs = fetch("docs.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    //find the doc
    var doc = findDocs(json.pages, url);
    //if the doc is found
    if (doc) {
      //create the html
      var html = `<h1>${doc.Name}</h1>
        <p>${doc.description}</p>
        <p>${doc.content}</p>`;
      //insert the html
      document.getElementById("content").innerHTML = html;

      turnJSONToHTML(doc.Text);

      convert();
    }
    //if the doc is not found
    else {
      //create the html
      var html = `<h1>404</h1>
        <p>The page you are looking for does not exist.</p>`;
      //insert the html
      document.getElementById("content").innerHTML = html;
    }

    fetch("sidebar.html")
      .then((req) => req.text())
      .then((html) => {
        document.getElementById("sidebar").innerHTML = html;
        //add the links
        for (var i = 0; i < json.pages.length; i++) {
          var page = json.pages[i];
          var link = document.createElement("ul");
          link.innerHTML = `<a href="#${page.Name.replace(" ", "-")}">${
            page.Name
          }</a>`;
          //link.href = "#" + page.Name.replace(" ", "-");
          document.getElementById("TopicsScroller").appendChild(link);
        }
      });
  });

window.onhashchange = function () {
  //relaod the page
  location.reload();
};
