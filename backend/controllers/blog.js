const BlogData = require("../models/blog");

exports.addBlog = (req, res) => {
  let blogData = new BlogData({
    title: req.body.title,
    content: req.body.blogContent
  });

  blogData
    .save()
    .then(() => {
      res.status(200).send({ updated: true });
    })
    .catch(() => {
      res.status(500).json({
        message: "Creating a blog failed!",
      });
    });
};

exports.getAllBlogs = (req, res) => {
  BlogData.find()
    .sort({ _id: -1 })
    .then((documents) => {
      res.status(200).json({blogs: documents});
    })
    .catch((err) => {
      res.status(500).json({
        message: "Getting all blogs failed!",
      });
    });
};

exports.getBlogById = (req, res) => {
  const _id = req.params.id;
  BlogData.find({ _id: _id })
    .then((document) => {
      res.status(200).json({
        blog: document,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Getting  blog by id failed!",
      });
    });
};

exports.deleteBlog = (req, res) => {
  const _id = req.params.id;
  BlogData.deleteOne({ _id })
    .then((result) => {
      return BlogData.find().sort({ _id: -1 });
    })
    .then((documents) => {
      res.status(200).json({
        blogs: documents
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deleting a blog failed!",
      });
    });
};

exports.updateBlog = (req, res) => {
  const _id = req.params.id;
  let blogData = new BlogData({
    title: req.body.title,
    content: req.body.blogContent,
  });
  BlogData.findOneAndUpdate({ _id: _id }, { $set: { title: blogData.title, content: blogData.content } })
    .then(() => {
      return BlogData.find().sort({ _id: -1 });
    })
    .then((documents) => {
      res.status(200).json({
        blogs: documents,
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Updating blog status failed!",
      });
    });
};
