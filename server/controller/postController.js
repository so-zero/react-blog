const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");
const HttpError = require("../models/errorModel");
const Post = require("../models/postModel");
const User = require("../models/userModel");

// =============
// Create Post
// =============
async function createPost(req, res, next) {
  try {
    let { title, category, description } = req.body;
    if (!title || !category || !description || !req.files) {
      return next(new HttpError("Fill in all fields", 422));
    }

    const { thumbnail } = req.files;
    let fileName = thumbnail.name;
    let splitted = fileName.split(".");
    let newFilename =
      splitted[0] + uuid() + "." + splitted[splitted.length - 1];
    thumbnail.mv(
      path.join(__dirname, "..", "uploads", newFilename),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        } else {
          const newPost = await Post.create({
            title,
            category,
            description,
            thumbnail: newFilename,
            creator: req.user.id,
          });
          if (!newPost) {
            return next(new HttpError("Post couldn't be created", 422));
          }

          const currentUser = await User.findById(req.user.id);
          const userPostCount = currentUser.posts + 1;
          await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });

          res.status(201).json(newPost);
        }
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
}

// =============
// Get All Post
// =============
async function getPosts(req, res, next) {
  try {
    const posts = await Post.find().sort({ updateAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
}

// =============
// Get Single Post
// =============
async function getPost(req, res, next) {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return next(new HttpError("Post not found", 404));
    }
    res.status(200).json(post);
  } catch (error) {
    return next(new HttpError(error));
  }
}

// =============
// Get Post Category
// =============
async function catPosts(req, res, next) {
  try {
    const { category } = req.params;
    const catPost = await Post.find({ category }).sort({ createdAt: -1 });
    res.status(200).json(catPost);
  } catch (error) {
    return next(new HttpError(error));
  }
}

// =============
// Get Post Category
// =============
async function userPosts(req, res, next) {
  try {
    const { id } = req.params;
    const posts = await Post.find({ creator: id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
}

// =============
// Edit Post
// =============
async function editPost(req, res, next) {
  try {
    let fileName;
    let newFilename;
    let updatedPost;

    const postId = req.params.id;
    let { title, category, description } = req.body;

    if (!title || !category || description.length < 10) {
      return next(new HttpError("Fill in all fields", 422));
    }

    const prevPost = await Post.findById(postId);
    if (req.user.id == prevPost.creator) {
      if (!req.files) {
        updatedPost = await Post.findByIdAndUpdate(
          postId,
          {
            title,
            category,
            description,
          },
          { new: true }
        );
      } else {
        fs.unlink(
          path.join(__dirname, "..", "uploads", prevPost.thumbnail),
          async (err) => {
            if (err) {
              return next(new HttpError(err));
            }
          }
        );
        const { thumbnail } = req.files;
        fileName = thumbnail.name;
        let splitted = fileName.split(".");
        newFilename =
          splitted[0] + uuid() + "." + splitted[splitted.length - 1];
        thumbnail.mv(
          path.join(__dirname, "..", "uploads", newFilename),
          async (err) => {
            if (err) {
              return next(new HttpError(err));
            }
          }
        );

        updatedPost = await Post.findByIdAndUpdate(
          postId,
          {
            title,
            category,
            description,
            thumbnail: newFilename,
          },
          { new: true }
        );
      }
    }
    if (!updatedPost) {
      return next(new HttpError("Couldn't update post.", 400));
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    return next(new HttpError(error));
  }
}

// =============
// Delete Post
// =============
async function deletePost(req, res, next) {
  try {
    const postId = req.params.id;
    if (!postId) {
      return next(new HttpError("Post unavailable", 400));
    }
    const post = await Post.findById(postId);
    const fileName = post?.thumbnail;

    if (req.user.id == post.creator) {
      fs.unlink(
        path.join(__dirname, "..", "uploads", fileName),
        async (err) => {
          if (err) {
            return next(new HttpError(err));
          } else {
            await Post.findByIdAndDelete(postId);

            const currentUser = await User.findById(req.user.id);
            const userPostCount = currentUser?.posts - 1;
            await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
            res.json("Post deleted successfully");
          }
        }
      );
    } else {
      return next(new HttpError("Post Couldn't be deleted", 403));
    }
  } catch (error) {
    return next(new HttpError(error));
  }
}

module.exports = {
  createPost,
  getPosts,
  getPost,
  catPosts,
  userPosts,
  editPost,
  deletePost,
};
