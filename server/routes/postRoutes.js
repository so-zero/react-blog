const express = require("express");
const {
  createPost,
  getPosts,
  getPost,
  catPosts,
  userPosts,
  editPost,
  deletePost,
} = require("../controller/postController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/categories/:category", catPosts);
router.get("/users/:id", userPosts);
router.patch("/:id", authMiddleware, editPost);
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
