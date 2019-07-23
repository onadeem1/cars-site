const nodemailer = require('nodemailer')
const router = require('express').Router()
const {Request, User} = require('../../database/models')
module.exports = router

//email setup
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'wishlistleads@gmail.com',
    pass: process.env.EMAIL_PW
  }
})

router.get('/', async (req, res, next) => {
  const requests = await Request.findAll({
    include: [User]
  })
  res.json(requests)
})

router.post('/', async (req, res, next) => {
  try {
    //get the user and car object off of the request
    const {user, cars} = req.body

    //find or create the user, pull off the fields needed for later
    const userInfo = await User.findOrCreate({
      where: {
        email: user.email,
        phoneNumber: user.phoneNumber,
        name: user.name
      }
    })
    const {id, email, phoneNumber, name} = userInfo[0]

    //create the requests w/ the created or found user with the user id
    const createdCars = await Promise.all(
      cars.map(car => Request.create({...car, userId: id}))
    )
    //send response to client
    res.status(201).json(createdCars)

    //send the email mapping over created cars
    createdCars.map(car => {
      const mailOptions = {
        from: 'Wishlist Auto Leads <wishlistleads@gmail.com>',
        to: 'Wishlist Auto Leads <wishlistleads@gmail.com>',
        subject: `New request: ${car.make} ${car.model}`,
        text: `A new car request has been recieved from:
        ${name}
        ${email}
        ${phoneNumber}
Requested Car:
        ${car.make} ${car.model}
        year: ${car.minYear} - ${car.maxYear}
        budget: ${car.minBudget} - ${car.maxBudget}
        mileage: ${car.maxMileage} or less
        zip: ${car.zip}`,
        html: `<p>A new car request has been received from:&nbsp;</p>
        <p style="padding-left: 40px;">${name}</p>
        <p style="padding-left: 40px;">${email}</p>
        <p style="padding-left: 40px;">${phoneNumber}</p>
        <p><strong>Requested Car:</strong>&nbsp;</p>
        <p style="padding-left: 40px;">${car.make} ${car.model}</p>
        <p style="padding-left: 40px;">year: ${car.minYear} - ${car.maxYear}</p>
        <p style="padding-left: 40px;">budget: ${car.minBudget} - ${
          car.maxBudget
        }</p>
        <p style="padding-left: 40px;">mileage: ${car.maxMileage} or less</p>
        <p style="padding-left: 40px;">zip: ${car.zip}</p>`
      }
      transporter.sendMail(mailOptions)
    })
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedRequest = await Request.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    res.json(updatedRequest[1])
  } catch (err) {
    next(err)
  }
})
