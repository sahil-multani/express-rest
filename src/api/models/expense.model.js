const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../errors/api-error");
const { env, jwtSecret, jwtExpirationInterval } = require("../../config/vars");

/**
* expense schema
 @public
 */
const expenseSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: " ",
    },
    amount: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true }
);

expenseSchema.method({
  transform() {
    const transformed = {};
    const fields = ["user_id", "amount", "createdAt", "_id", "content"];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});
module.exports = mongoose.model("expense", expenseSchema);
