const express = require("express");
const Lists = require("./lists-model");
const router = express.Router();

router.get("/", (req, res) => {
  Lists.find()
    .then(list => {
      res.status(200).json(list);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Failed to get lists, error: ${error}.` });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Lists.findById(id)
    .then(list => {
      if (list) {
        res.json(list);
      } else {
        res
          .status(404)
          .json({ message: "Could not find a list with the given id." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Failed to get list, error: ${error}.` });
    });
});

router.get("/:id/user", (req, res) => {
  const { id } = req.params;

  Lists.findByList(id)
    .then(list => {
      if (list.length > 0) {
        res.status(200).json(list);
      } else {
        res.status(404).json({
          message: "Could not find user list information for specified id."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: `Failed to get list information, error: ${error}.`
      });
    });
});

router.post("/", (req, res) => {
  const listData = req.body;

  Lists.add(listData)
    .then(list => {
      res
        .status(201)
        .json({ message: "The list was successfully created." });
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Failed to create new list, error: ${error}.` });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, user_id } = req.body;
  const changes = { id, name, user_id };

  Lists.findById(id)
    .then(list => {
      if (list) {
        Lists.update(changes, id).then(updatedList => {
          res
            .status(200)
            .json({ message: "List has been successfully updated.", updatedList });
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find the list with that id." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Failed to create new list, error: ${error}.` });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Lists.remove(id)
    .then(deleted => {
      if (deleted) {
        res
          .status(200)
          .json({ message: "The list was successfully deleted." });
      } else {
        res.status(404).json({
          message: "Could not find the list with the specified id."
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Failed to delete the list, error: ${error}.` });
    });
});

module.exports = router;