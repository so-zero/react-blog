const express = require("express");
const {
  register,
  login,
  userDetails,
  getAuthors,
  changeAvatar,
  editUser,
} = require("../controller/userControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:id", userDetails);
router.get("/", getAuthors);
router.post("/change-avatar", authMiddleware, changeAvatar);
router.patch("/edit-user", authMiddleware, editUser);

module.exports = router;
