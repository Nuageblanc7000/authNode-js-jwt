const { Request, Response, NextFunction } = require("express");
const { Schema } = require("yup");
/**
 *
 * @param {Schema} schema
 * @returns
 */
const validateBody = (schema) => {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  return async (req, res, next) => {
    try {
      const validation = await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = validateBody;
