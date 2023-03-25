const Post = require("../models/Post");

exports.getAllPosts = async (req, res) => {
  const allPosts = await Post.find({}).sort("-dateCreated");
  res.render("index.ejs", { allPosts });
};

exports.postNewPost = async (req, res) => {
  const { title, detail } = req.body;
  const newPost = Post({
    title,
    detail,
  });
  await newPost.save();
  res.redirect("/");
};

exports.showPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post.ejs", { post });
};

exports.updatePost = async (req, res) => {
  const { title, detail } = req.body;
  const post = await Post.findByIdAndUpdate(req.params.id, { title, detail });
  res.redirect("/");
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
