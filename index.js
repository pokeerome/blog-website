import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var posts = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

app.post("/submit", (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.render("index.ejs", { posts });
});

app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const post = posts[id];
  res.render("edit.ejs", { id, post });
});

app.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  posts[id] = { title: req.body.title, content: req.body.content };
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  posts.splice(id, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});