exports.checkPayload = (req, res, next) => {
    if (!req.body.project_name) {
      next({
        status: 400,
        message: " project_name missing",
      });
    }
    next();
  };