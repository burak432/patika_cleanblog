//express
const express = require("express");
const app = express();
const path = require("path");

//mongoose
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://burak432:fw4URk52yuMki3QC@cluster0.frch3vu.mongodb.net/cleanblog-db?retryWrites=true&w=majority"
);
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

//method-override
const methodOverride = require("method-override");
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

//mvc
const postController = require("./controllers/postController");
const pageController = require("./controllers/pageController");

////////////////////routes

//home
app.get("/", postController.getAllPosts);

//about
app.get("/about", pageController.getAboutPage);

//add new post
app.get("/add", pageController.getAddNewPost);

//add new post form handler
app.post("/add", postController.postNewPost);

//show post
app.get("/posts/:id", postController.showPost);

//edit post form
app.get("/posts/:id/edit", pageController.getEditPage);

//edit post form handler
app.put("/posts/:id", postController.updatePost);

//delete post
app.delete("/posts/:id", postController.deletePost);

//server listener
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
