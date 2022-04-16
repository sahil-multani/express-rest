const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/expense.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const Usercontroller = require('../../controllers/user.controller');

const router = express.Router();
const {
  getExpense,
  createExpense,
  deleteExpense,
} = require('../../validations/expense.validation');

router
  .route('/get/:user_id')
  /**
   * @api {get} v1/expense/get/:userId  List Expense
   * @apiDescription get list of  Expenses
   * @apiVersion 1.0.0
   * @apiName GetExpense
   * @apiGroup expense
   * @apiPermission User
   *
   * @apiHeader {String} Authorization   User's access token
   *

   *
   * @apiSuccess {Object[]} created expense data.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */

  .get(authorize(), validate(getExpense), controller.get);

router
  .route('/create')
  /**
   * @api {post} v1/expense/create create/Update Expense
   * @apiDescription create and update Expense
   * @apiVersion 1.0.0
   * @apiName createExpense
   * @apiGroup expense
   * @apiPermission User
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number}              amount      Amount to add
   * @apiParam  {String}              user_id      logged in users Id
   * @apiParam  {String}              [content]
   * @apiParam  {String}              [id]     update the expense
   *
   * @apiSuccess {Object[]} created expense data.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */

  .post(authorize(), validate(createExpense), controller.create);

router
  .route('/delete')
  /**
   * @api {post} v1/expense/delete Delete Expense
   * @apiDescription delete Expense
   * @apiVersion 1.0.0
   * @apiName DeleteExpense
   * @apiGroup expense
   * @apiPermission User
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String}              id     Delete the expense by given Id

   *
   * @apiSuccess {Object[]} returns empty Array.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */

  .post(authorize(), validate(deleteExpense), controller.delete);

module.exports = router;
