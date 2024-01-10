const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "apnacollege",
    content: "I love coding",
  },
  {
    id: uuidv4(),
    username: "shraddhakhapra",
    content: "I love teaching",
  },
  {
    id: uuidv4(),
    username: "saugatsn",
    content: "I love learning",
  },
];
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => {
    return id === p.id;
  });
  res.render("show.ejs", { post });
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});
app.post("/posts", (req, res) => {
  let id = uuidv4();
  let { username, content } = req.body;
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => {
    return id === p.id;
  });
  post.content = newContent;
  console.log(post);
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => {
    return id === p.id;
  });
  res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => {
    return id !== p.id;
  });
  res.redirect("/posts");
});

app.listen(port, (req, res) => {
  console.log(`Listening on port: ${port}`);
});
