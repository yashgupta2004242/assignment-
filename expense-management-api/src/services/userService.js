const { User } = require("../models");

const createUser = async (data) => {
  return await User.create(data);
};

module.exports = {
  createUser,
};
