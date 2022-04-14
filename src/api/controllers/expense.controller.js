const httpStatus = require("http-status");
const { omit } = require("lodash");
const Expense = require("../models/expense.model");
/**
 * Load expense and append to req.
 * @public
 */
exports.get = async (req, res, next) => {
  try {
    // const expenseData = omit(req.body, "role");

    let expense = await Expense.find({ user_id: req?.params?.user_id }).lean();
    // const userTransformed = expense.transform();
    // const token = generateTokenResponse(expense, expense.token());
    res.status(httpStatus.OK);
    return res.json({ data: expense });
  } catch (error) {
    return next(error);
  }
};
exports.create = async (req, res, next) => {
  try {
    const expenseData = omit(req.body, "role");
    let expense = "";
    console.log(expenseData);
    if (expenseData.id) {
      console.log("update");
      expense = await Expense.findOneAndUpdate(
        { _id: expenseData.id },
        expenseData,
        { returnOriginal: false }
      );
    } else expense = await new Expense(expenseData).save();
    const userTransformed = expense.transform();
    // const token = generateTokenResponse(expense, expense.token());
    res.status(httpStatus.CREATED);
    return res.json({ data: userTransformed });
  } catch (error) {
    return next(error);
  }
};
exports.delete = async (req, res, next) => {
  try {
    const expenseData = omit(req.body, "role");

    let expense = await Expense.deleteOne(expenseData);
    // const userTransformed = expense.transform();
    // const token = generateTokenResponse(expense, expense.token());
    res.status(httpStatus.OK);
    return res.json({ data: [] });
  } catch (error) {
    return next(error);
  }
};
