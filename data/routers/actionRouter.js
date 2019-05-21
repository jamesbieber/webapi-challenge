const dbActions = require("../helpers/actionModel");

const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const actions = await dbActions.get();
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving actions." });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const actions = await dbActions.get(id);

    if (id) {
      res.status(200).json(actions);
    } else {
      res.status(404).json({ message: "The action " });
    }
  } catch (err) {
    res.status(500).json({ message: "Error retrieving actions." });
  }
});

router.post("/", async (req, res) => {
  const info = { ...req.body };

  try {
    const action = await dbActions.insert(req.body);

    if (!req.body.project_id || !req.body.description || !req.body.notes) {
      res.status(400).json({
        message:
          "Please provide project_id, description, AND notes in the body."
      });
    }

    if (action) {
      res.status(201).json(action);
    } else {
      res
        .status(404)
        .json({ message: "The project with the specified ID does not exist." });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error adding action."
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const action = await dbActions.update(req.params.id, req.body);

    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({
        message: "The project with the specified ID does not exist"
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong updating the action."
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await dbActions.remove(req.params.id);

    if (count > 0) {
      res.status(200).json({
        message: "Action has been removed"
      });
    } else {
      res.status(404).json({
        message: "The action with the specified ID does not exist."
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong with removing the action."
    });
  }
});

module.exports = router;
