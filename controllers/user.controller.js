const adminService = require("../services/admin.service");
const userService = require("../services/user.service");
const { ErrorResponse } = require("../utils/responses/Error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../utils/responses/Success.response");

const userController = {
  getAll: async (req, res, next) => {
    const users = await userService.getAll(req.protocol, req.get("host"));

    res.status(200).json(new SuccessArrayResponse(users, req));
  },
  getById: async (req, res, next) => {
    const id = req.params.id;
    const user = await userService.getById(id);
    res.status(200).json(new SuccessResponse(user));
  },
  update: async (req, res, next) => {
    const id = req.params.id;
    const userUpdate = req.body;

    const isUpdate = await userService.update(userUpdate, id);
    if (!isUpdate) {
      res.status(400).json(new ErrorResponse("Une erreur est survenue", 400));
    }
    const user = userService.getById(id);
    res.status(201).json(new SuccessResponse(user, 201));
  },
  delete: async (req, res, next) => {
    const id = req.params.id;
    await userService.delete(id);
    res
      .status(204)
      .json(new SuccessResponse({ message: "suppression ok" }, 204));
  },
  addRole: async (req, res, next) => {
    const id = req.params.id;
    const { roles } = req.body;
    const user = await adminService.addRole(id, roles);
    console.log(user);

    res.status(200).json(user);
  },
  deleteRole: async (req, res, next) => {
    const id = req.params.id;
    const { roles } = req.body;

    const user = await adminService.deleteRole(id, roles);

    res.status(200).json(user);
  },

  getAllByRoles: async (req, res, next) => {
    const users = await adminService.getUsersRoles("user");
    console.log(users);
    res.status(200).json(users);
  },
};

module.exports = userController;
