const db = require("../../data/dbConfig");

exports.checkPayload = (req, res, next) => {
  try {
    const { task_description } = req.body;

    if (!task_description) {
      next({
        status: 400,
        message: "task_description zorunlu",
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};