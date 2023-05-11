const authController = require("../controllers/auth.controller");
const validateBody = require("../middlewares/validateBody.middleware");
const schemaUser = require("../validators/user.schema");

const authRouter = require("express").Router();

authRouter
  .route("/register")
  .post(validateBody(schemaUser), authController.register);
authRouter.route("/login").post(authController.login);

module.exports = authRouter;
