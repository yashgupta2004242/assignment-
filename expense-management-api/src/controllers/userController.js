const userService = require("../services/userService");

const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "name and email are required",
      });
    }
    const user = await userService.createUser({
      name,
      email,
    });
    res.status(201).json({
      success: true,
      message: "user created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
};
