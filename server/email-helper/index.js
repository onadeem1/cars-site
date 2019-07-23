const nodemailer = require('nodemailer')

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

const sendEmail = function(user, cars) {
  cars.map(car => {
    const mailOptions = {
      from: 'Wishlist Auto Leads <wishlistleads@gmail.com>',
      to: 'Wishlist Auto Leads <wishlistleads@gmail.com>',
      subject: `New request: ${car.make} ${car.model}`,
      text: `A new car request has been recieved from:
      ${user.name}
      ${user.email}
      ${user.phoneNumber}
Requested Car:
      ${car.make} ${car.model}
      year: ${car.minYear} - ${car.maxYear}
      budget: ${car.minBudget} - ${car.maxBudget}
      mileage: ${car.maxMileage} or less
      zip: ${car.zip}`,
      html: `<p>A new car request has been received from:&nbsp;</p>
      <p style="padding-left: 40px;">${user.name}</p>
      <p style="padding-left: 40px;">${user.email}</p>
      <p style="padding-left: 40px;">${user.phoneNumber}</p>
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
}

module.exports = sendEmail
