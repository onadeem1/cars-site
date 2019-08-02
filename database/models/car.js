const { STRING, INTEGER, BOOLEAN, DATE } = require('sequelize')
const db = require('../db')
const moment = require('moment')

const Car = db.define('car', {
  createdAt: {
    type: DATE,
    get() {
      return moment(this.getDataValue('createdAt')).format('MM/DD/YY')
    }
  },
  make: {
    type: STRING,
    allowNull: false
  },
  model: {
    type: STRING,
    allowNull: false
  },
  minYear: {
    type: INTEGER,
    allowNull: false
  },
  maxYear: {
    type: INTEGER,
    allowNull: false
  },
  minBudget: {
    type: INTEGER,
    allowNull: false
  },
  maxBudget: {
    type: INTEGER,
    allowNull: false
  },
  maxMileage: {
    type: INTEGER,
    allowNull: false
  },
  open: {
    type: BOOLEAN,
    defaultValue: true
  }
})

Car.createMultiple = async function(cars, userId) {
  const createdCars = await Promise.all(
    cars.map(car => Car.create({ ...car, userId }))
  )
  return createdCars
}

module.exports = Car
