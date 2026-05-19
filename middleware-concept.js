import express from "express";

// middleware runs on every request and response. it can modify every request and response.

const app = express();

app.use((req, res, next) => {
  console.log("middleware1 is running");
  // we have to call next() to move to the next middleware or route handler. if we do not call next() then our request will stuck and page will load continuously.
  next();
});

// we must have to write middleware before route handler because middleware runs before route handler. if we write middleware after route handler then it will not run because route handler will send response and after sending response our request will end and middleware will not run. so we have to write middleware before route handler.
app.use((req, res, next) => {
  console.log("middleware2 is running");
  next();
});

app.get("/", (req, res) => {
  return res.send("<h1>Middleware</h1>");
});

app.listen(8000, () => console.log("server is running on port 8000"));
