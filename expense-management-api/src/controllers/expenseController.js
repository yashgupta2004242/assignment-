const expenseService = require("../services/expenseService");

const createExpense = async (req, res, next) => {
  try {
    const { userId, title, amount, category, description } = req.body;
    if (!userId || !title || !amount || !category) {
      return res.status(400).json({
        success: false,
        message: "userId, title, amount and category are required",
      });
    }
    if (Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "amount must be greater than 0",
      });
    }
    const expense = await expenseService.createExpense({
      userId,
      title,
      amount,
      category,
      description,
    });
    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    next(error);
  }
};

const getExpense = async (req, res, next) => {
  try {
    const expenses = await expenseService.getExpense(req.query);
    res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    next(error);
  }
};

const getExpenseById = async (req, res, next) => {
  try {
    const expense = await expenseService.getExpenseById(req.params.id);
    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    next(error);
  }
};

const updateExpense = async (req, res, next) => {
  try {
    const expense = await expenseService.updateExpense(
      req.params.id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "expense updated succesfully",
      data: expense,
    });
  } catch (error) {
    next(error);
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    await expenseService.deleteExpense(req.params.id);
    res.status(200).json({
      success: true,
      message: "expense deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createExpense,
  getExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
