const db = require("../../data/dbConfig");

exports.checkPayload = (req, res, next) => {
  try {
    if (!req.body.resource_name) {
      next({ status: 400, message: "name eksik" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

exports.checkResourceNameUnique = async (req, res, next) => {
  try {
    const name = await db("resources")
      .where("resource_name", req.body.resource_name)
      .first();
    if (name) {
      next({ status: 404, message: "name var" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};