const { UserDTO, UsersDTO } = require("../DTO/User.dto");
const db = require("../models");

const userService = {
  getAll: async (protocol, host, limit = 10, offset = 0) => {
    console.log(protocol, "------>");
    const { count, rows } = await db.User.findAndCountAll({
      limit,
      offset,
    });
    return {
      users: rows.map(
        (u) => new UsersDTO(u, `${protocol}://${host}/api/user/${u.id}`)
      ),
      count,
    };
  },
  getById: async (id) => {
    console.log(id);
    const user = await db.User.findByPk(id);

    return user ? new UserDTO(user) : null;
  },
  emailExist: async (email) => {
    const user = await db.User.findOne({
      where: { email },
    });
    return !!user;
  },
  create: async (newUser) => {
    const user = await db.User.create(newUser);

    return user ? new UserDTO(user) : null;
  },
  update: async (userUpdate, id) => {
    const [updateRows] = await db.User.update(userUpdate, {
      where: { id },
    });
    console.log(updateRows);
    return updateRows === 1;
  },
  delete: async (id) => {
    const user = await db.User.destroy({ where: { id } });

    return user === 1;
  },
};

module.exports = userService;
