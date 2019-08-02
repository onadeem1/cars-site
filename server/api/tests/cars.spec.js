/* global describe beforeEach it */
const { expect } = require('chai')
const request = require('supertest')
const db = require('../../../database')
const app = require('../../index')
const Car = db.model('car')
const User = db.model('user')

const omer = {
  email: 'omer@aol.com',
  phoneNumber: '516 555 5555',
  zip: 11801,
  name: 'Omer Nadeem'
}

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

describe('Car routes', () => {
  beforeEach('clear the tables', () => {
    return db.sync({ force: true })
  })

  describe('POST /api/cars/', () => {
    it('successfully creates the user & cars', async () => {
      const res = await request(app)
        .post('/api/cars')
        .send({ user: omer, cars })
        .expect(201)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(2)
    })
  })

  describe('GET /api/cars/', () => {
    beforeEach('add car & user', async () => {
      const user = await User.create(omer)
      Car.create({ ...cars[0], userId: user.id })
    })
    it('successfully gets the cars & user', async () => {
      const res = await request(app)
        .get('/api/cars')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(1)
      expect(res.body[0].user).to.be.an('object')
      expect(res.body[0].user.name).to.be.equal(omer.name)
    })
  })
  describe('PUT /api/cars/:id', () => {
    let car
    beforeEach('add car & user', async () => {
      const user = await User.create(omer)
      car = await Car.create({ ...cars[0], userId: user.id })
    })
    it('successfully updates the car', async () => {
      const res = await request(app)
        .put(`/api/cars/${car.id}`)
        .send({ open: false })
      expect(res.body).to.be.an('object')
      expect(res.body.open).to.be.equal(false)
    })
  })
})
