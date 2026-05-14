// This is the same as url-handling.js file using express

import express from "express";
import fs from "fs";

const app = express();

// app.use is like a middleware which will run before every request or response
app.use((req, res, next) => {
  if (req.url === "/favicon.ico") {
    res.end();
    return;
  }

  fs.appendFileSync("./express.txt", `${Date.now()}: ${req.url}` + "\n");

  // if we did not use next() than our request will stuck forever and page will load continuously
  next();
});

app.get("/", (req, res) => {
  res.send("<h1>Home page of Express</h1>");
});

app.get("/about-us", (req, res) => {
  res.send("<h1>About Us page of Express</h1>");
});

app.get("/contact-us", (req, res) => {
  res.send("<h1>Contact Us page of Express</h1>");
});

app.use((req, res) => {
  res.status(404).send("<h1>Page not found</h1>");
});

app.listen(8000, () => console.log("Express server started"));
