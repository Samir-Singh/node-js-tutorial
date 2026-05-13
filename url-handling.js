import fs from "fs";
import http from "http";
import url from "url";

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    res.end();
    return;
  }

  const myUrl = url.parse(req.url);

  fs.appendFileSync("./url-handling.txt", `${Date.now()}: ${req.url}` + "\n");

  switch (myUrl.pathname) {
    case "/":
      res.end("<h1>Home page of url-handling</h1>");
      break;
    case "/about-us":
      res.end("<h1>About Us page of url-handling</h1>");
      break;
    case "/contact-us":
      res.end("<h1>Contact Us page of url-handling</h1>");
      break;
    default:
      res.end("<h1>Page not found</h1>");
  }
});

myServer.listen(8000, () => console.log("url-handling server started"));
