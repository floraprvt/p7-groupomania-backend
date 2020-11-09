const Sequelize = require('sequelize')
const sequelize = require('../database/connection')

module.exports = sequelize.define('Gif', {
  gifId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  title: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  url: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  likes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})