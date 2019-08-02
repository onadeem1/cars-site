const Car = require('./car')
const User = require('./user')
const Admin = require('./admin')

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

User.hasMany(Car)
Car.belongsTo(User)

module.exports = {
  Car,
  User,
  Admin
}
