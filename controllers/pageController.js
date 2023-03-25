const Post = require("../models/Post");

exports.getAboutPage = (req, res) => {
  res.render("about.ejs");
};

exports.getAddNewPost = (req, res) => {
  res.render("add_post.ejs");
};

exports.getEditPage = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("edit_post.ejs", { post });
};
