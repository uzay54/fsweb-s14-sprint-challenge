//  `/api/projects` router buraya
const express = require("express");
const Project = require("./model");
const router = express.Router();

const md = require("./middleware");

router.get("/", (req, res, next) => {
  try {
    Project.getAll().then((projects) => {
      res.status(200).json(projects);
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", md.checkPayload, async (req, res, next) => {
  try {
    Project.create(req.body).then((project) => {
      res.status(200).json(project);
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
