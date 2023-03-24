const express = require("express");
const app = express();
const path = require("path");

//mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/cleanblog-test-db");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("mongoose connected");
});

//model
const Post = require("./models/Post");

//static files
app.use(express.static(path.join(__dirname, "public")));

//ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//form parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

////////////////////routes
// app.get("/", (req, res) => {
//   const blog = {
//     id: 1,
//     title: "Blog title",
//     description: "Blog description",
//   };
//   res.json(blog);
// });

//home
app.get("/", async (req, res) => {
  const allPosts = await Post.find({}).sort("-dateCreated");
  res.render("index.ejs", { allPosts });
});

//about
app.get("/about", (req, res) => {
  res.render("about.ejs");
});

//add new post
app.get("/add", (req, res) => {
  res.render("add_post.ejs");
});

//add new post form handler
app.post("/add", async (req, res) => {
  const { title, detail } = req.body;
  const newPost = Post({
    title,
    detail,
  });
  await newPost.save();
  res.redirect("/");
});

//show post
app.get("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post.ejs", { post });
});

//server listener
const port = 3000;
app.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
