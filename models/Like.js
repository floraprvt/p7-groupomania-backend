const Sequelize = require('sequelize')
const sequelize = require('../database/connection')

module.exports = sequelize.define('Like', {
  likeId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
})