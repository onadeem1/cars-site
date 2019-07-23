// const crypto = require('crypto')
const {STRING, INTEGER, BOOLEAN} = require('sequelize')
const db = require('../db')

const Request = db.define('request', {
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

module.exports = Request
