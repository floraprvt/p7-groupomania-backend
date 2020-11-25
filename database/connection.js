const Sequelize = require("sequelize");
const config = require("../config/config.json");

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;
global.sequelize = sequelize;
