const { Sequelize } = require("sequelize");

const { DB_DATABASE, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  dialect: "mysql",
  host: DB_DATABASE,
});

const db = {};

db.sequelize = sequelize;

db.User = require("./user.model")(sequelize);

module.exports = db;
