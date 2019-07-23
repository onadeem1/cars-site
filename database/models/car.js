const {STRING, INTEGER, BOOLEAN} = require('sequelize')
const db = require('../db')

const Car = db.define('car', {
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
  zip: {
    type: INTEGER,
    allowNull: false,
    len: [0, 5]
  },
  open: {
    type: BOOLEAN,
    defaultValue: true
  }
})

Car.createMultiple = async function(cars, userId) {
  const createdCars = await Promise.all(
    cars.map(car => Car.create({...car, userId}))
  )
  return createdCars
}

module.exports = Car
