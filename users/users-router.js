const express = require("express");
const Users = require("./users-model");
const router = express.Router();

router.get("/", (req, res) => {
  Users.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Failed to get users, error: ${error}.` });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Users.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "Could not find a user with the given id." });
      }
    })
    .catch(error => {
      res.status(500).json({ message: `Failed to get user, error: ${error}.` });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Users.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json({ message: "The user was successfully deleted." });
      } else {
        res
          .status(404)
          .json({ message: "Could not find the user with the specified id." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Failed to delete the user, error: ${error}.` });
    });
});

module.exports = router;