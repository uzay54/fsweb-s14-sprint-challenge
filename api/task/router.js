// `/api/tasks` router buraya
const express = require("express");
const Task = require("./model");

const router = express.Router();

const md = require("./middleware");

router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.getAll();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.post("/", md.checkPayload, async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

module.exports = router;