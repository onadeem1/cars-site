/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Car = db.model('car')
const User = db.model('user')

describe('Car model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('classMethods', () => {
    describe('createMultiple', () => {
      const cars = [
        {
          make: 'Nissan',
          model: 'Altima',
          minYear: 1998,
          maxYear: 2004,
          minBudget: 5000,
          maxBudget: 20000,
          maxMileage: 25000
        },
        {
          make: 'Honda',
          model: 'Civic',
          minYear: 1994,
          maxYear: 2009,
          minBudget: 2000,
          maxBudget: 15000,
          maxMileage: 50000
        }
      ]
      let createdCars
      let user

      beforeEach(async () => {
        user = await User.create({
          name: 'Omer',
          email: 'omer@aol.com',
          phoneNumber: '12345678',
          zip: 11011
        })
        createdCars = await Car.createMultiple(cars, user.id) //3 is userId
      })

      it('returns the correct array length', () => {
        expect(createdCars.length).to.equal(2)
      })

      it('creates all the needed keys', () => {
        createdCars.forEach(car => {
          expect(car.dataValues).to.include.all.keys(
            'make',
            'model',
            'minYear',
            'maxYear',
            'maxBudget',
            'maxMileage',
            'minBudget'
          )
        })
      })
      it('creates the right values', () => {
        createdCars.forEach(car => {
          expect(car.dataValues.userId).to.equal(user.id)
          expect(car.dataValues.make).to.be.oneOf([cars[0].make, cars[1].make])
          expect(car.dataValues.model).to.not.be.oneOf(['Camry, Sentra'])
        })
      })
    })
  })
})
