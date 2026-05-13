import fs from "fs";
import http from "http";

const myServer = http.createServer((req, res) => {
  const requestData = {
    method: req.method,
    url: req.url,
    headers: req.headers,
    httpVersion: req.httpVersion,
  };

  fs.writeFileSync(
    "./http-server.txt",
    JSON.stringify(requestData, null, 2) + "\n\n",
    (err) => {
      if (err) {
        console.log(err);
      }
    },
  );

  res.end("Hello from http-server");
});

myServer.listen(8000, () => console.log("http-server server started"));
