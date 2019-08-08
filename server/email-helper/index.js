const nodemailer = require('nodemailer')

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
      ph: ${user.phoneNumber}
      zip: ${user.zip}
Requested Car:
      ${car.make} ${car.model}
      year: ${car.minYear} - ${car.maxYear}
      budget: ${car.minBudget} - ${car.maxBudget}
      mileage: ${car.maxMileage} or less
      `,
      html: `<p>A new car request has been received from:&nbsp;</p>
      <p style="padding-left: 40px;">${user.name}</p>
      <p style="padding-left: 40px;">${user.email}</p>
      <p style="padding-left: 40px;">ph: ${user.phoneNumber}</p>
      <p style="padding-left: 40px;">zip: ${user.zip}</p>
      <p><strong>Requested Car:</strong>&nbsp;</p>
      <p style="padding-left: 40px;">${car.make} ${car.model}</p>
      <p style="padding-left: 40px;">year: ${car.minYear} - ${car.maxYear}</p>
      <p style="padding-left: 40px;">budget: ${car.minBudget} - ${
        car.maxBudget
      }</p>
      <p style="padding-left: 40px;">mileage: ${car.maxMileage} or less</p>`
    }
    transporter.sendMail(mailOptions)
  })
}

const sendInventoryEmail = function(user, car) {
  const mailOptions = {
    from: 'Wishlist Auto Leads <wishlistleads@gmail.com>',
    to: 'Wishlist Auto Leads <wishlistleads@gmail.com>',
    subject: `Inventory request: ${car.make} ${car.model}`,
    text: `${user.name} is inquiring about the ${car.color} ${car.year} ${
      car.make
    } ${car.model} you have in stock.

      Customer Info:
      ${user.name}
      e: ${user.email}
      ph: ${user.phoneNumber}
      `,
    html: `${user.name} is inquiring about the ${car.color} ${car.year} ${
      car.make
    } ${car.model} you have in stock.
      <p><strong>Customer Info:</strong>&nbsp;</p>
      <p style="padding-left: 40px;">${user.name}</p>
      <p style="padding-left: 40px;">e: ${user.email}</p>
      <p style="padding-left: 40px;">ph: ${user.phoneNumber}</p>`
  }
  transporter.sendMail(mailOptions)
}

module.exports = { sendEmail, sendInventoryEmail }
