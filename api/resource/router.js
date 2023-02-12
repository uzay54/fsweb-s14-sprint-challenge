// `/api/resources` router buraya
const express = require("express");

const Resource = require("./model");
const router = express.Router();

const md = require("./middleware");

router.get("/", async (req, res, next) => {
  try {
    const resources = await Resource.getAll();
    res.status(200).json(resources);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  md.checkPayload,
  md.checkResourceNameUnique,
  async (req, res, next) => {
    try {
      const re = await Resource.create(req.body);
      res.status(201).json(re);
    } catch (err) {
      next(err);
    }
  }
);

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
