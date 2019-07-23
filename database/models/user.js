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

User.findOrCreateAndReturnId = async function(userObj) {
  const newUser = await User.findOrCreate({
    where: userObj
  })
  return newUser[0].id
}

module.exports = User
