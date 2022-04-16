const Joi = require('joi');
const Expense = require('../models/expense.model');

module.exports = {
  createExpense: {
    body: {
      amount: Joi.number().min(1).required(),
      user_id: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
      id: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      content: Joi.string().allow().empty(),
    },
  },
  deleteExpense: {
    body: {
      id: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
  },
  getExpense: {
    params: {
      user_id: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
  },
};
