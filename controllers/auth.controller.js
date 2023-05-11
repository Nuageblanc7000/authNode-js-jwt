const authService = require("../services/auth.service");
const jwt = require("../utils/jwt.utils");

const { SuccessResponse } = require("../utils/responses/Success.response");
const { ErrorResponse } = require("../utils/responses/Error.response");
const authController = {
  register: async (req, res) => {
    const data = req.body;
    const user = await authService.register(data);
    if (!user) {
      res
        .status(400)
        .json(new ErrorResponse("Mot de passe ou email incorrecte"));
    }
    const token = await jwt.generate(user);
    res.status(201).json(new SuccessResponse({ user, token }, 201));
  },
  login: async (req, res, next) => {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    console.log(user);
    if (!user) {
      res
        .status(400)
        .json(new ErrorResponse("Mot de passe ou email incorrecte"));
    }
    const token = await jwt.generate(user);
    res.status(200).json(new SuccessResponse({ user, token }));
  },
};

module.exports = authController;
