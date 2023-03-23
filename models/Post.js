//mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/cleanblog-test-db");

const postSchema = new mongoose.Schema({
  title: String,
  detail: String,
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
