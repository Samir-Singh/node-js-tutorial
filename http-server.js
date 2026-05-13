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
    "./request.txt",
    JSON.stringify(requestData, null, 2) + "\n\n",
    (err) => {
      if (err) {
        console.log(err);
      }
    },
  );

  res.end("Hello from server");
});

myServer.listen(8000, () => console.log("server started"));
