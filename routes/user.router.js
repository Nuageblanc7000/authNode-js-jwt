const userController = require("../controllers/user.controller");
const authMiddleWare = require("../middlewares/auth.middleware");
const authAccessMiddleWare = require("../middlewares/authAccess.middleware");
const db = require("../models");
const { ErrorResponse } = require("../utils/responses/Error.response");

const userRouter = require("express").Router();

userRouter
  .route("/")
  .get(authMiddleWare(), authAccessMiddleWare(), userController.getAll);

userRouter.route("/all").get(userController.getAllByRoles);

userRouter
  .route("/:id")
  .get(async (req, res, next) => {
    const id = req.params.id;
    const user = await db.User.findByPk(id);
    if (!user) {
      res.status(404).json(new ErrorResponse("Aucune ressource trouvée", 404));
    } else {
      next();
    }
  }, userController.getById)
  .put(authMiddleWare(), userController.update)
  .delete(authMiddleWare(), userController.delete);

userRouter.route("/addRole/:id").patch(userController.addRole);
userRouter.route("/deleteRole/:id").patch(userController.deleteRole);
module.exports = userRouter;
