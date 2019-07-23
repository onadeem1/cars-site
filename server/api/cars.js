const router = require('express').Router()
const {Car, User} = require('../../database/models')
const sendEmail = require('../email-helper')
module.exports = router

router.get('/', async (req, res, next) => {
  const cars = await Car.findAll({
    include: [User]
  })
  res.json(cars)
})

router.post('/', async (req, res, next) => {
  try {
    const {user, cars} = req.body
    const userId = await User.findOrCreateAndReturnId(user)
    const createdCars = await Car.createMultiple(cars, userId)
    res.status(201).json(createdCars)
    sendEmail(user, cars)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedCar = await Car.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    res.json(updatedCar[1])
  } catch (err) {
    next(err)
  }
})
