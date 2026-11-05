const { clear } = require("console");
const express = require("express");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

const app = express();

const port = 8080;
const path = require("path");

app.use(methodOverride("_method"));

app.use(express.urlencoded( { extended : true } ));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id : uuidv4(),
    userName : "mark_zukerberg11",
    content : "Software Developer!"
  },
  {
    id : uuidv4(),
    userName : "elonMusk12",
    content : "Future of AI"
  },
  {
    id : uuidv4(),
    userName : "trump",
    content : "United States of America"
  },
];

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

//Create
app.post("/posts", (req, res) => {
  let { userName, content } = req.body;
  let id = uuidv4();
  posts.push({ id, userName, content });
  res.redirect("/posts");
})

//Show
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
})

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
})

//Update
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
})

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

//delete
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
})

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
})