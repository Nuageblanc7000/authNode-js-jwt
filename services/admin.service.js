const { Op } = require("sequelize");
const { UserDTO } = require("../DTO/User.dto");
const db = require("../models");

const adminService = {
  //permet d'ajouter un role on peut retourner une réponse si on le désire

  addRole: async (userId, newRoles) => {
    const currentUser = await db.User.findByPk(userId);
    const roles = currentUser.roles;
    console.log(roles);
    if (!roles.includes(newRoles)) {
      const newTabRole = [...roles, newRoles];
      currentUser.roles = newTabRole;
      currentUser.save();
    }
  },
  //permet de supprimer un role on peut retourner une réponse si on le désire
  deleteRole: async (userId, newRoles) => {
    const currentUser = await db.User.findByPk(userId);
    const roles = currentUser.roles;
    const newTabRole = roles.filter((r) => r !== newRoles);
    currentUser.roles = newTabRole;
    currentUser.save();
  },
  //permet de rechercher des users par un roles défini
  getUsersRoles: async (userRole) => {
    const { count, rows } = await db.User.findAndCountAll({
      where: {
        roles: {
          [Op.like]: [`%${userRole}%`],
        },
      },
    });
    return {
      users: rows.map((u) => new UserDTO(u)),
      count,
    };
  },
};

module.exports = adminService;
