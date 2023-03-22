const express = require("express");
const app = express();

////////////////////routes
app.get("/", (req, res) => {
  const blog = {
    id: 1,
    title: "Blog title",
    description: "Blog description",
  };
  res.json(blog);
});

const port = 3000;
app.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
