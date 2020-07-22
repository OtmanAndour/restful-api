const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

// Get back all the posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find(); // find() is a mongoose method
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// Submit a post
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// Get a specific post

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ msg: "No post matching this id" });
  }
});

//Delete a post
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.deleteOne({
      _id: req.params.postId,
    });
    res.status(200).json(removedPost);
  } catch (err) {
    res.status(400).json({ msg: "No post matching this id" });
  }
});

// Update a post
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      {
        _id: req.params.postId,
      },
      { $set: { title: req.body.title } }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json({ msg: "No post matching this id" });
  }
});

module.exports = router;
