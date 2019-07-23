const {STRING, INTEGER} = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  name: {
    type: STRING,
    allowNull: false
  },
  email: {
    type: STRING,
    allowNull: false,
    isEmail: true
  },
  phoneNumber: {
    type: INTEGER,
    allowNull: false
  }
})

module.exports = User
