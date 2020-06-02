const express = require("express");
const blogController = require("../controllers/blog");
const router = express.Router();

router.post("/addBlog", blogController.addBlog);
router.get("/getAllBlogs", blogController.getAllBlogs);
router.get("/getBlogById/:id", blogController.getBlogById);
router.delete("/deleteBlog/:id", blogController.deleteBlog);
router.put("/updateBlog/:id", blogController.updateBlog);
module.exports = router;
