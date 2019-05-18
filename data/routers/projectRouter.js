const dbProjects = require("../helpers/projectModel");

const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await dbProjects.get();
    res.status(200).json(projects);
  } catch (err) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving projects."
    });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const projects = await dbProjects.get(id);

    if (id) {
      res.status(200).json(projects);
    } else {
      res.status(404).json({
        message: "The project with the specified ID does not exist."
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving projects."
    });
  }
});

router.post("/", async (req, res) => {
  const info = { ...req.body };

  try {
    const project = await dbProjects.insert(req.body);

    if (!req.body.name || !req.body.description) {
      res.status(400).json({
        message: "Please include name and description in the body"
      });
    }

    if (project) {
      res.status(201).json(project);
    } else {
      res.status(404).json({
        message: "Project was not added successfully."
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error adding project"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const prevProject = await dbProjects.get(req.params.id);
    const project = await dbProjects.update(req.params.id, req.body);

    console.log(prevProject);

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({
        message: "The project with the specified ID does not exist."
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong updating the project."
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await dbProjects.remove(req.params.id);

    if (count > 0) {
      res.status(200).json({
        message: "Project has been removed"
      });
    } else {
      res.status(404).json({
        message: "The project with the specified ID does not exist."
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong with removing the project."
    });
  }
});

module.exports = router;
