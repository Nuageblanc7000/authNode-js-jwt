const jwt = require("../utils/jwt.utils");
const { ErrorResponse } = require("../utils/responses/Error.response");

const authAccessMiddleWare = () => {
  /**
   * @param {Request} req
   * @param {Response} res
   * @param  {import("express").NextFunction} next
   *
   */
  return async (req, res, next) => {
    console.log(req.payload.id);
    next();
  };
};

module.exports = authAccessMiddleWare;
