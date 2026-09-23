const { Op } = require("sequelize");
const { Expense, User } = require("../models");

const createExpense = async (data) => {
  const user = await User.findByPk(data.userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return await Expense.create(data);
};

const getExpense = async (query) => {
  let {
    page = 1,
    limit = 10,
    userId,
    category,
    fromDate,
    toDate,
  } = query;

  page = Number(page);
  limit = Number(limit);

  if (!Number.isInteger(page) || page < 1) {
    const error = new Error("Invalid pagination");
    error.statusCode = 400;
    throw error;
  }

  if (!Number.isInteger(limit) || limit < 1) {
    const error = new Error("Invalid pagination");
    error.statusCode = 400;
    throw error;
  }

  const where = {};

  if (userId) {
    const parsedUserId = Number(userId);
    if (!Number.isInteger(parsedUserId)) {
      const error = new Error("invalid user id");
      error.statusCode = 400;
      throw error;
    }
    where.userId = parsedUserId;
  }

  if (category) {
    where.category = category;
  }

  if (fromDate || toDate) {
    where.createdAt = {};
    if (fromDate) {
      where.createdAt[Op.gte] = new Date(`${fromDate}T00:00:00`);
    }
    if (toDate) {
      where.createdAt[Op.lte] = new Date(`${toDate}T23:59:59`);
    }
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await Expense.findAndCountAll({
    where,
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });

  return {
    expense: rows,
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
    },
  };
};

const getExpenseById = async (id) => {
  const expense = await Expense.findByPk(id);
  if (!expense) {
    const error = new Error("Expense not found");
    error.statusCode = 404;
    throw error;
  }
  return expense;
};

const updateExpense = async (id, data) => {
  const expense = await Expense.findByPk(id);
  if (!expense) {
    const error = new Error("Expense not found");
    error.statusCode = 404;
    throw error;
  }
  await expense.update(data);
  return expense;
};

const deleteExpense = async (id) => {
  const expense = await Expense.findByPk(id);
  if (!expense) {
    const error = new Error("Expense not found");
    error.statusCode = 404;
    throw error;
  }
  await expense.destroy();
};

module.exports = {
  createExpense,
  getExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
