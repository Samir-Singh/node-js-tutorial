import express from "express";
import users from "./MOCK_DATA.json" assert { type: "json" };

const app = express();

// Creating HTML Document Route
app.get("/users", (req, res) => {
  const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`)?.join("")}
        </ul>
    `;
  return res.send(html);
});

// Creating JSON Routes
app
  .route("/api/users")
  .get((req, res) => {
    return res.json(users);
  })
  .post((req, res) => {
    // TODO: Create new user
    return res.json({ status: "pending" });
  });

app
  .route("/api/user/:id")
  .get((req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user?.id === Number(id));
    return res.json(user);
  })
  .post((req, res) => {
    // TODO: Create new user
    return res.json({ status: "pending" });
  })
  .patch((req, res) => {
    // TODO: Edit the user with id
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    // TODO: Delete user with id
    return res.json({ status: "pending" });
  });

app.listen(8000, () => console.log("Server started"));

// here is have used app.route("").get(()=>{}).post(()=>{}).put(()=>{}) which is called as route grouping
