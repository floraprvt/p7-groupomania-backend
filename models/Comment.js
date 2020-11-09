const Sequelize = require('sequelize')
const sequelize = require('../database/connection')

module.exports = sequelize.define('Comment', {
  commentId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  attachment: {
    type: Sequelize.STRING(120),
  },
  likes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})