const jwt = require("../utils/jwt.utils");
const { ErrorResponse } = require("../utils/responses/Error.response");

const authMiddleWare = () => {
  /**
   * @param {Request} req
   * @param {Response} res
   * @param  {import("express").NextFunction} next
   *
   */
  return async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken || bearerToken === "Bearer" || bearerToken === "") {
      next(new ErrorResponse("bearrer token est invalid", 400));
    }
    const token = bearerToken?.split(" ")[1];
    const payload = await jwt.decode(token);
    req.payload = payload;
    next();
  };
};

module.exports = authMiddleWare;
