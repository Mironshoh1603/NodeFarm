const fs = require("fs");
const http = require("http");
const slugify = require("slugify");
const url = require("url");
const replaceFunc = require("./modules/ReplaceFunction.js");

// const about = fs.readFileSync("./html/about.html", "utf-8");
// const contact = fs.readFileSync("./html/contact.html", "utf-8");
// const home = fs.readFileSync("./html/home.html", "utf-8");
// const login = fs.readFileSync("./html/login.html", "utf-8");

// const sortUrl = function (urlcha, res) {

//   } else if (urlcha == "/contact") {
//     res.writeHead(200, {
//       "content-type": "text/html",
//       "my-header": "Zurr work",
//     });
//     res.end(contact);
//   } else if (urlcha == "/home") {
//     res.writeHead(200, {
//       "content-type": "text/html",
//       "my-header": "Zurr work",
//     });
//     res.end(home);
//   } else if (urlcha == "/login") {
//     res.writeHead(200, {
//       "content-type": "text/html",
//       "my-header": "Zurr work",
//     });
//     res.end(login);
//   } else if (urlcha === "/api") {
//     res.writeHead(200, {
//       "content-type": "text/json",
//       "my-header": "Zurr work",
//     });
//     res.end(data);
//   } else {
//     res.end("kjkwdm dcwkdcn");
//   }
// };

let overview = fs.readFileSync("./templates/overview.html", "utf-8");
let card = fs.readFileSync("./templates/card.html", "utf-8");
let product = fs.readFileSync("./templates/product.html", "utf-8");

const data = fs.readFileSync("./dev-data/data.json", "utf-8");
let dataObj = JSON.parse(data);
console.log(dataObj);

const server = http.createServer((req, res) => {
  const changeCards = dataObj
    .map((val) => {
      return replaceFunc(card, val);
    })
    .join("");
  let output = overview.replace("{CardProduct}", changeCards);
  const slug = slugify("Slom Nimagap", "-");
  console.log(slug);
  let urlcha = req.url;
  let query = +url.parse(urlcha, true).query.id;
  if (urlcha === "/overview" || urlcha === "/") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    res.end(output);
  } else if (urlcha === `/product?id=${query}`) {
    let obj = dataObj.find((val) => val.id === query);
    let productHTML = replaceFunc(product, obj);
    res.url = slugify(obj.productName);

    res.writeHead(200, {
      "content-type": "text/html",
    });
    res.end(productHTML);
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-header": "test",
    });
    res.end("<h1 style='color:red'>Page not found!</h1>");
  }
});
server.listen("8000", "127.0.0.3");
