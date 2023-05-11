const argon2 = require("argon2");
const db = require("../models");
const { UserDTO } = require("../DTO/User.dto");
const authService = {
  register: async (userAdd) => {
    const pwd = userAdd.password;
    userAdd.password = await argon2.hash(pwd);
    const { roles, ...userAddNotRoles } = userAdd;
    const user = await db.User.create(userAddNotRoles);
    return user ? new UserDTO(user) : null;
  },
  login: async (email, pass) => {
    const user = await db.User.findOne({
      where: { email },
    });
    if (!user) {
      return null;
    }
    const passwordIsValid = await argon2.verify(user.password, pass);
    return passwordIsValid ? new UserDTO(user) : null;
  },
};

module.exports = authService;
