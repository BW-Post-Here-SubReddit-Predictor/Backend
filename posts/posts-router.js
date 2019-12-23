const express = require("express");
const Posts = require("./posts-model");
const router = express.Router();

router.get("/", (req, res) => {
  Posts.find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Failed to get Posts, error: ${error}.` });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Posts.findById(id)
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        res
          .status(404)
          .json({ message: "Could not find a post with the given id." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Failed to get post, error: ${error}.` });
    });
});

router.get("/:id/user", (req, res) => {
  const { id } = req.params;

  Posts.findByPost(id)
    .then(post => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "Could not find user post information for specified id."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: `Failed to get post information, error: ${error}.`
      });
    });
});

router.post("/", (req, res) => {
  const postData = req.body;
  console.log(req.body)
  Posts.add(postData)
    .then(post => {
      res
        .status(201)
        .json({ message: "The post was successfully created." });
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Failed to create new post, error: ${error}.` });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, user_id } = req.body;
  const changes = { id, name, user_id };

  Posts.findById(id)
    .then(post => {
      if (post) {
        Posts.update(changes, id).then(updatedpost => {
          res
            .status(200)
            .json({ message: "Post has been successfully updated.", updatedpost });
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find the post with that id." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Failed to create new post, error: ${error}.` });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Posts.remove(id)
    .then(deleted => {
      if (deleted) {
        res
          .status(200)
          .json({ message: "The post was successfully deleted." });
      } else {
        res.status(404).json({
          message: "Could not find the post with the specified id."
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Failed to delete the post, error: ${error}.` });
    });
});

module.exports = router;