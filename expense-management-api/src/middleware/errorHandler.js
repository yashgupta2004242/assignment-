const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      success: false,
      message: err.errors[0].message,
    });
  }
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      success: false,
      message: err.errors[0].message,
    });
  }
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal error",
  });
};

module.exports = errorHandler;
