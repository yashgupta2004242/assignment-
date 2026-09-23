const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");

const sequelize = require("./config/database");
require("./models");

const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Expense Management API is running",
  });
});

app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);

app.use(errorHandler);

module.exports = { app, sequelize };
