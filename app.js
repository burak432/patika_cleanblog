const express = require("express");
const app = express();
const path = require("path");

//static files
app.use(express.static(path.join(__dirname, "public")));

//ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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
app.get("/", (req, res) => {
  res.render("index.ejs");
});

//about
app.get("/about", (req, res) => {
  res.render("about.ejs");
});

//add new post
app.get("/add", (req, res) => {
  res.render("add_post.ejs");
});

//server listener
const port = 3000;
app.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
