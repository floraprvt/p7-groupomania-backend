const Sequelize = require('sequelize')
const sequelize = require('../database/connection')

module.exports = sequelize.define('User', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  firstName: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  avatar: {
    type: Sequelize.STRING(255),
  },
  officePosition: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  isAdmin: {
    type: Sequelize.TINYINT,
    allowNull: false,
    defaultValue: 0
  }
})
