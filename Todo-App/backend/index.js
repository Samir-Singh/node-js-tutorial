import cors from "cors";
import express from "express";
import fs from "fs";

const app = express();

let todos = JSON.parse(fs.readFileSync("./todo.json", "utf-8"));

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

// our backend must have this below line otherwise our req.body will be undefined
// Without this middleware, Express cannot read JSON sent from Axios.
app.use(express.json());

app.get("/todo", (req, res) => {
  return res.json(todos);
});

app.post("/todo", (req, res) => {
  const body = req.body;
  const id = Date.now();

  todos.push({ ...body, id });
  fs.writeFile("./todo.json", JSON.stringify(todos), (err, data) => {
    if (err) {
      return res.status(500).json({ status: "error" });
    }

    return res.json({ status: "success", id });
  });
});

app.patch("/todo/:id", (req, res) => {
  const body = req.body;
  const id = Number(req.params.id);

  todos = todos?.map((item) => {
    if (item?.id === id) {
      return {
        ...item,
        name: body.name,
      };
    }

    return item;
  });

  fs.writeFile("./todo.json", JSON.stringify(todos), (err, data) => {
    if (err) {
      return res.status(500).json({ status: "error" });
    }

    return res.json({ status: "success", id: Number(id) });
  });
});

app.delete("/todo/:id", (req, res) => {
  const id = req.params.id;
  todos = todos?.filter((item) => item?.id != id);
  fs.writeFile("./todo.json", JSON.stringify(todos), (err, data) => {
    if (err) {
      return res.status(500).json({ status: "error" });
    }

    return res.json({ status: "success", id: Number(id) });
  });
});

app.listen(8000, () => console.log("Server Started"));
